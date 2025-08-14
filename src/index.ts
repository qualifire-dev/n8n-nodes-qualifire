import { QualifireApi } from './credentials/QualifireApi.credentials';
import { OpenAiApi } from './credentials/OpenAiApi.credentials';
import { QualifireModel } from './nodes/QualifireModel/QualifireModel.node';

export const nodes = [ QualifireModel ];
export const credentials = [ QualifireApi, OpenAiApi ];
