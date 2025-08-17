import { QualifireOpenAI } from './credentials/QualifireOpenAI.credentials';
import { QualifireModel } from './nodes/QualifireModel/QualifireModel.node';

export const nodes = [QualifireModel];
export const credentials = [QualifireOpenAI];