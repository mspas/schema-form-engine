import { ControlSchema } from './form-control.model';

export interface FormSchema<TModel extends object> {
  id: string;
  controls: ControlSchema<TModel>[];
}
