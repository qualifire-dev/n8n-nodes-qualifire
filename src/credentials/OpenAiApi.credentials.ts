import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class OpenAiApi implements ICredentialType {
  name = 'openAiApiForQualifire';
  displayName = 'OpenAI API (for Qualifire Model)';
  documentationUrl = 'https://platform.openai.com/';
  properties: INodeProperties[] = [
    {
      displayName: 'OpenAI API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      placeholder: 'sk-...',
    },
  ];
}
