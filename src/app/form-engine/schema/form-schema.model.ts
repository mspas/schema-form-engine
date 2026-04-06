import { BaseSubjectSchema, ControlSchema } from './form-control.model';

export interface GroupFieldSchema extends BaseSubjectSchema {
  type: 'group';
  controls: (GroupFieldSchema | ControlSchema)[];
}

export interface FormSchema {
  controls: (GroupFieldSchema | ControlSchema)[];
  id?: string;
}
