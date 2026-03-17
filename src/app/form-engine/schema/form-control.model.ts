import { ValidatorSchema } from './validator-schema.model';
import { VisibilityRule } from './visibility-rule.mode';

export type ControlSchema<TModel> =
  | TextControlSchema<TModel>
  | NumberControlSchema<TModel>
  | CheckboxControlSchema<TModel>
  | SelectControlSchema<TModel>;

export type KeysOfType<T, TValue> = {
  [K in keyof T]: T[K] extends TValue ? K : never;
}[keyof T];

export interface BaseControlSchema<TModel, TValue> {
  type: string;
  controlName: KeysOfType<TModel, TValue>;
  label?: string;
  initialValue?: TValue;
  validators?: ValidatorSchema[];
  visibility?: VisibilityRule<TModel>;
}

export interface TextControlSchema<TModel> extends BaseControlSchema<
  TModel,
  string
> {
  type: 'text';
  placeholder?: string;
}

export interface NumberControlSchema<TModel> extends BaseControlSchema<
  TModel,
  number
> {
  type: 'number';
  min?: number;
  max?: number;
}

export interface CheckboxControlSchema<TModel> extends BaseControlSchema<
  TModel,
  boolean
> {
  type: 'checkbox';
}

export interface SelectControlSchema<TModel> extends BaseControlSchema<
  TModel,
  string
> {
  type: 'select';
  options: SelectOption[];
}

export interface SelectOption {
  label: string;
  value: string;
}
