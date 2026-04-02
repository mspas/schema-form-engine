import { ControlSchema } from './form-control.model';

export interface FormSchema {
  id: string;
  controls: ControlSchema[];
}
