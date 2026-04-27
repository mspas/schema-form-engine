import { inject, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {
  CustomValidatorSchema,
  VALIDATOR_TYPES,
  ValidatorSchema,
} from '../validators/validator-schema.model';
import { ErrorMessageRegistry } from './error-messages.registry';

@Injectable()
export class ErrorMessageService {
  private readonly registry = inject(ErrorMessageRegistry);

  getErrorMessages(
    control: AbstractControl,
    validators: ValidatorSchema[],
  ): string[] {
    if (!control.errors) return [];

    return Object.entries(control.errors).map(([errorKey, errorValue]) => {
      const validatorSchema = this.getValidatorSchema(errorKey, validators);

      // 1. schema override
      if (validatorSchema?.errorMessage) {
        return validatorSchema.errorMessage;
      }

      // 2. registry fallback
      const factory = this.registry.get(errorKey as ValidatorSchema['type']);
      if (factory) {
        return factory(errorValue);
      }

      // 3. fallback
      return `Invalid field`;
    });
  }

  private getValidatorSchema(
    errorKey: ValidatorSchema['type'] | CustomValidatorSchema['key'],
    validators: ValidatorSchema[],
  ): ValidatorSchema | undefined {
    return validators.find((validator) =>
      validator.type !== VALIDATOR_TYPES.custom
        ? validator.type === errorKey
        : validator.key === errorKey,
    );
  }
}
