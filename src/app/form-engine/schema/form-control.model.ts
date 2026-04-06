import { FormControl } from '@angular/forms';
import { ValidatorSchema } from './validator-schema.model';
import { VisibilityRule } from './visibility-rule.mode';

export type ControlSchema =
  | TextControlSchema
  | NumberControlSchema
  | CheckboxControlSchema
  | SelectControlSchema;

export interface BaseSubjectSchema {
  type: string;
  label?: string;
}

export interface BaseControlSchema extends BaseSubjectSchema {
  controlName: string;
  initialValue?: unknown;
  validators?: ValidatorSchema[];
  visibility?: VisibilityRule<unknown>;
}

export interface TextControlSchema extends BaseControlSchema {
  type: 'text';
  placeholder?: string;
}

export interface NumberControlSchema extends BaseControlSchema {
  type: 'number';
  placeholder?: string;
  min?: number;
  max?: number;
}

export interface CheckboxControlSchema extends BaseControlSchema {
  type: 'checkbox';
}

export interface SelectControlSchema extends BaseControlSchema {
  type: 'select';
  placeholder?: string;
  options: SelectOption[];
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface FieldRenderer<TSchema = unknown> {
  control: FormControl;
  controlSchema: TSchema;
}
