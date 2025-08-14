# Qualifire + n8n local test

## 1) Setup
```bash
cd qualifire-n8n-local
cp .env.example .env
# edit .env to add your keys
docker compose up -d
# open http://localhost:5678 (use basic auth from .env)
```

## 2) Quick connectivity check
```bash
./smoke-test.sh
```

## 3) n8n workflow
In n8n, click **Import from File** and select `n8n-workflow-qualifire-proxy.json`.
Then click **Execute Node** on the `HTTP Request` node.

You can also build the node manually:
- **Method**: POST
- **URL**: `https://proxy.qualifire.ai/api/providers/openai/v1/chat/completions`
- **Headers**:
  - `Authorization: Bearer {{$env.OPENAI_API_KEY}}`
  - `X-Qualifire-Api-Key: {{$env.QUALIFIRE_API_KEY}}`
  - `Content-Type: application/json`
- **JSON Body**:
```json
{
  "model": "gpt-4o-mini",
  "messages": [{"role":"user","content":"Say hello from n8n via Qualifire."}]
}
```
