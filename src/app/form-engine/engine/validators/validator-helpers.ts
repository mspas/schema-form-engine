import { ValidatorSchema, ValidatorFunction } from './validator-schema.model';

export const required = (): ValidatorSchema => ({
  type: 'required',
});

export const minLength = (value: number): ValidatorSchema => ({
  type: 'minLength',
  value,
});

export const maxLength = (value: number): ValidatorSchema => ({
  type: 'maxLength',
  value,
});

export const min = (value: number): ValidatorSchema => ({
  type: 'min',
  value,
});

export const max = (value: number): ValidatorSchema => ({
  type: 'max',
  value,
});

export const customValidator = (fn: ValidatorFunction): ValidatorSchema => ({
  type: 'custom',
  fn,
});
