#!/usr/bin/env bash
set -euo pipefail

# Load variables from .env if present
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

: "${OPENAI_API_KEY:?Set OPENAI_API_KEY in .env}"
: "${QUALIFIRE_API_KEY:?Set QUALIFIRE_API_KEY in .env}"

echo "== Chat Completions smoke test via Qualifire proxy =="
curl -sS -X POST "https://proxy.qualifire.ai/api/providers/openai/v1/chat/completions"   -H "Authorization: Bearer ${OPENAI_API_KEY}"   -H "X-Qualifire-Api-Key: ${QUALIFIRE_API_KEY}"   -H "Content-Type: application/json"   -d '{"model":"gpt-4o-mini","messages":[{"role":"user","content":"Say hello from cURL via Qualifire proxy."}]}' | jq '.choices[0].message'

echo ""
echo "== Responses API smoke test =="
curl -sS -X POST "https://proxy.qualifire.ai/api/providers/openai/v1/responses"   -H "Authorization: Bearer ${OPENAI_API_KEY}"   -H "X-Qualifire-Api-Key: ${QUALIFIRE_API_KEY}"   -H "Content-Type: application/json"   -d '{"model":"gpt-4o-mini","input":"Say hello from the Responses API via Qualifire proxy."}' | jq '.output[0] // .output_text // .response'
