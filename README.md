
# n8n-nodes-qualifire-model

**Qualifire OpenAI‑Compatible Model** for n8n Agents. This node injects the required
`X-Qualifire-Api-Key` header and uses the Qualifire OpenAI‑compatible base URL
(no `/v1`), so you can connect it directly to the **Agent → Chat Model** input.

> Base URL used by default:
>
> `https://proxy.qualifire.ai/api/providers/openai`

## Install (no-publish local)

**docker-compose.yml**
```yaml
services:
  n8n:
    image: n8nio/n8n:latest
    ports: ["5678:5678"]
    environment:
      - N8N_CUSTOM_EXTENSIONS=/extensions
    volumes:
      - ./extensions:/extensions
```

**Place the built package here:**
```
./extensions/n8n-nodes-qualifire-model/
```

Then restart the container.

### Build locally
```bash
npm i
npm run build
# copy dist/ into ./extensions/n8n-nodes-qualifire-model/
```

> If your n8n version shows peer dep warnings, install matching versions:
> `npm i -D n8n-workflow@<your-n8n-version> n8n-core@<your-n8n-version>`

## Usage

1. Add **Qualifire Model** node.
2. Set credentials:
   - **OpenAI API (for Qualifire Model)**
   - **Qualifire API**
3. (Optional) Toggle **Responses API Mode** if you prefer `/responses` over `/chat/completions`.
4. Connect the node's **Model** output to **Agent → Chat Model**.
5. Open chat and talk. The Agent will call OpenAI through Qualifire.

### Test the node
Click **Execute node** on the Qualifire Model node. The first output (main)
returns a live call with a test prompt. If it fails, check keys and ensure the URL
does **not** include `/v1`.

## Notes

- If your Agent refuses to connect to the node's Model output, your n8n build may expect a
  different output key (e.g., `ai_model` instead of `aiModel`). In that case, change the `outputs`
  array in `QualifireModel.node.ts` to `['main', 'ai_model']`, rebuild, and try again.
- You can also switch the node to read keys from env by enabling **Expose Bearer from Env Instead of Credential**.
