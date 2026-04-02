import { Injectable } from '@angular/core';
import { FormSchema } from '../schema/form-schema.model';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class FormBuilderService {
  buildForm(schema: FormSchema): FormGroup {
    return new FormGroup(
      Object.fromEntries(
        Object.entries(schema.controls).map(([, control]) => {
          return [
            control.controlName,
            new FormControl({ value: control.initialValue, disabled: false }),
          ];
        }),
      ),
    );
  }
}
