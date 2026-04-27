import { Inject, Injectable, InjectionToken } from '@angular/core';
import {
  VALIDATOR_TYPES,
  ValidatorType,
} from '../validators/validator-schema.model';
import { ValidationErrors } from '@angular/forms';

export type ErrorMessageFactory = (error: ValidationErrors) => string;

export interface ErrorMessageDef {
  type: ValidatorType;
  message: ErrorMessageFactory;
}

export const ERROR_MESSAGES = new InjectionToken<ErrorMessageDef[]>(
  'ERROR_MESSAGES',
);

export const DEFAULT_ERROR_MESSAGES: ErrorMessageDef[] = [
  {
    type: VALIDATOR_TYPES.required,
    message: () => 'This field is required',
  },
  {
    type: VALIDATOR_TYPES.minlength,
    message: (err) => `Minimum length is ${err['requiredLength']}`,
  },
  {
    type: VALIDATOR_TYPES.maxlength,
    message: (err) => `Maximum length is ${err['requiredLength']}`,
  },
  {
    type: VALIDATOR_TYPES.min,
    message: (err) => `Minimum value is ${err['min']}`,
  },
  {
    type: VALIDATOR_TYPES.max,
    message: (err) => `Maximum value is ${err['max']}`,
  },
];

@Injectable()
export class ErrorMessageRegistry {
  private map = new Map<ValidatorType, ErrorMessageFactory>();

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(@Inject(ERROR_MESSAGES) defs: ErrorMessageDef[][] = []) {
    defs.flat().forEach((def) => {
      this.map.set(def.type, def.message);
    });
  }

  get(type: ValidatorType): ErrorMessageFactory | null {
    return this.map.get(type) ?? null;
  }
}
