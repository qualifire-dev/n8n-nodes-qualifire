import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class QualifireApi implements ICredentialType {
  name = 'qualifireApi';
  displayName = 'Qualifire API';
  documentationUrl = 'https://docs.qualifire.ai/integrations/openai';
  properties: INodeProperties[] = [
    {
      displayName: 'Qualifire API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      placeholder: 'qualifire_xxx',
    },
  ];
}
