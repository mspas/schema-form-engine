import {
  ValidatorSchema,
  ValidatorFunction,
  VALIDATOR_TYPES,
} from './validator-schema.model';

export const required = (errorMessage?: string): ValidatorSchema => ({
  type: VALIDATOR_TYPES.required,
  errorMessage,
});

export const minLength = (
  value: number,
  errorMessage?: string,
): ValidatorSchema => ({
  type: VALIDATOR_TYPES.minlength,
  value,
  errorMessage,
});

export const maxLength = (
  value: number,
  errorMessage?: string,
): ValidatorSchema => ({
  type: VALIDATOR_TYPES.maxlength,
  value,
  errorMessage,
});

export const min = (value: number, errorMessage?: string): ValidatorSchema => ({
  type: VALIDATOR_TYPES.min,
  value,
  errorMessage,
});

export const max = (value: number, errorMessage?: string): ValidatorSchema => ({
  type: VALIDATOR_TYPES.max,
  value,
  errorMessage,
});

export const customValidator = (
  key: string,
  fn: ValidatorFunction,
  errorMessage?: string,
): ValidatorSchema => ({
  type: VALIDATOR_TYPES.custom,
  key,
  fn,
  errorMessage,
});
