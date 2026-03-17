import { Injectable } from '@angular/core';
import { FormSchema } from '../schema/form-schema.model';
import { FormGroup } from '@angular/forms';

@Injectable()
export class FormBuilderService {
  buildForm<TModel extends object>(schema: FormSchema<TModel>): FormGroup {
    console.log('Building form with schema:', schema);
    return new FormGroup({});
  }
}
