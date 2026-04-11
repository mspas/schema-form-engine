import { AbstractControl, ValidationErrors } from '@angular/forms';

export type ValidatorSchema =
  | RequiredValidatorSchema
  | MinLengthValidatorSchema
  | MaxLengthValidatorSchema
  | MinValidatorSchema
  | MaxValidatorSchema
  | CustomValidatorSchema;

export interface RequiredValidatorSchema {
  type: 'required';
}

export interface MinLengthValidatorSchema {
  type: 'minLength';
  value: number;
}

export interface MaxLengthValidatorSchema {
  type: 'maxLength';
  value: number;
}

export interface MinValidatorSchema {
  type: 'min';
  value: number;
}

export interface MaxValidatorSchema {
  type: 'max';
  value: number;
}

export interface CustomValidatorSchema {
  type: 'custom';
  fn: ValidatorFunction;
}

export type ValidatorFunction = (
  control: AbstractControl,
) => ValidationErrors | null;
