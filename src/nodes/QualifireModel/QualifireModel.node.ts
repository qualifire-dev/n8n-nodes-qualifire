import { ChatOpenAI } from '@langchain/openai';
import {
  type INodeType,
  type INodeTypeDescription,
  type ISupplyDataFunctions,
  type SupplyData,
} from 'n8n-workflow';


export class QualifireModel implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Qualifire Chat Model (OpenAI-compatible)',
    name: 'qualifireChatModel',
    icon: 'file:qualifire.svg',
    group: ['transform'],
    version: 1,
    description: 'Supplies a Chat Model via Qualifire proxy (adds X-Qualifire-Api-Key; no /v1).',
    defaults: { name: 'Qualifire Chat Model' },

    inputs: [],
    outputs: ['ai_languageModel'],
    outputNames: ['Model'],

    credentials: [
      { name: 'qualifireOpenAi', required: false },
    ],

    properties: [
      {
        displayName: 'Base URL',
        name: 'baseUrl',
        type: 'string',
        default: 'https://proxy.qualifire.ai/api/providers/openai',
        description: 'Do NOT include /v1',
      },
      {
        displayName: 'Model',
        name: 'model',
        type: 'string',
        default: 'gpt-4o-mini',
      },
      {
        displayName: 'Temperature',
        name: 'temperature',
        type: 'number',
        typeOptions: { minValue: 0, maxValue: 2, numberStepSize: 0.1 },
        default: 0.7,
      },
      {
        displayName: 'Use Env Keys (OPENAI_API_KEY, QUALIFIRE_API_KEY)',
        name: 'useEnvKeys',
        type: 'boolean',
        default: false,
      },
    ],
  };

  async supplyData(this: ISupplyDataFunctions): Promise<SupplyData> {
    const baseUrl = this.getNodeParameter('baseUrl', 0) as string;
    const model = this.getNodeParameter('model', 0) as string;
    const temperature = this.getNodeParameter('temperature', 0) as number;
 
    const useEnvKeys = this.getNodeParameter('useEnvKeys', 0) as boolean;

    let openAiKey = '';
    let qualifireKey = '';

    if (useEnvKeys) {
      openAiKey = process.env.OPENAI_API_KEY || '';
      qualifireKey = process.env.QUALIFIRE_API_KEY || '';
    } else {
      const creds = await this.getCredentials('qualifireOpenAi').catch(() => null);
      openAiKey = (creds?.openAiApiKey as string) || '';
      qualifireKey = (creds?.qualifireApiKey as string) || '';
    }

    if (!openAiKey || !qualifireKey) {
      throw new Error('Provide keys via env (OPENAI_API_KEY, QUALIFIRE_API_KEY) or select the bundled credential.');
    }
   // LangChain chat model configured to hit Qualifire’s base and inject the header
    const chat = new ChatOpenAI({
      model,
      temperature,
      apiKey: openAiKey,
      configuration: {
        baseURL: baseUrl, // IMPORTANT: no /v1 here
        defaultHeaders: { 'X-Qualifire-Api-Key': qualifireKey },
      },
    });

    return { response: chat };
  }
}