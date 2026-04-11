import { Injectable } from '@angular/core';
import { FormSchema, GroupFieldSchema } from '../schema/form-schema.model';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { ControlSchema } from '../schema/form-control.model';
import { ValidatorSchema } from '../engine/validators/validator-schema.model';

@Injectable()
export class FormBuilderService {
  buildForm(schema: FormSchema): FormGroup {
    const controls: Record<string, FormControl> = {};

    const collectControls = (node: FormSchema | GroupFieldSchema) => {
      for (const item of node.controls) {
        if (this.isGroupFieldSchema(item)) {
          collectControls(item);
        } else {
          controls[item.controlName] = new FormControl(
            item.initialValue ?? null,
            {
              updateOn: item.updateOn ?? schema.updateOn,
              validators: this.mapSchemaValidators(item.validators),
            },
          );
        }
      }
    };

    collectControls(schema);
    return new FormGroup(controls, { updateOn: schema.updateOn });
  }

  private mapSchemaValidators(
    validators?: ValidatorSchema[],
  ): ValidatorFn[] | null {
    if (!validators?.length) {
      return null;
    }

    return validators.map((validator) => {
      switch (validator.type) {
        case 'required':
          return Validators.required;
        case 'minLength':
          return Validators.minLength(validator.value);
        case 'maxLength':
          return Validators.maxLength(validator.value);
        case 'min':
          return Validators.min(validator.value);
        case 'max':
          return Validators.max(validator.value);
        case 'custom':
          return validator.fn;
        default:
          return () => null;
      }
    });
  }

  private isGroupFieldSchema(
    obj: GroupFieldSchema | ControlSchema,
  ): obj is GroupFieldSchema {
    return 'controls' in obj;
  }
}
