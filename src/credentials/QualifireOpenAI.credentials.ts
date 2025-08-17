import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class QualifireOpenAI implements ICredentialType {
  name = 'qualifireOpenAi';
  displayName = 'Qualifire + OpenAI (2 keys)';
  documentationUrl = 'https://docs.qualifire.ai/integrations/openai';
  properties: INodeProperties[] = [
    {
      displayName: 'OpenAI API Key',
      name: 'openAiApiKey',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      placeholder: 'sk-...',
    },
    {
      displayName: 'Qualifire API Key',
      name: 'qualifireApiKey',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      placeholder: 'qualifire_xxx',
    },
  ];
}