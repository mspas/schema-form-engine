import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormRendererComponent } from '../form-engine/engine/form-renderer/form-renderer.component';
import { FormSchema } from '../form-engine/schema/form-schema.model';
import {
  customValidator,
  maxLength,
  minLength,
  required,
} from '../form-engine/engine/validators/validator-helpers';

interface UserFormModel {
  firstName: string;
  lastName: string;
  age: number;
  newsletter: boolean;
  gender: string;
}

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  imports: [FormRendererComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent {
  schema: FormSchema = {
    controls: [
      {
        type: 'group',
        controls: [
          {
            type: 'text',
            controlName: 'firstName',
            label: 'First Name',
            placeholder: 'Enter your first name',
            updateOn: 'change',
            validators: [
              required(),
              minLength(3, 'Name is too short'),
              maxLength(100),
            ],
          },
          {
            type: 'text',
            controlName: 'lastName',
            label: 'Last Name',
            placeholder: 'Enter your last name',
            validators: [required(), minLength(3), maxLength(100)],
          },
        ],
        options: {
          orientation: 'row',
        },
      },
      {
        type: 'number',
        controlName: 'age',
        label: 'Age',
        placeholder: 'Enter your age',
      },
      {
        type: 'checkbox',
        controlName: 'acceptTerms',
        label: 'Accept Terms and Conditions',
        updateOn: 'change',
        validators: [
          customValidator(
            'mustAccept',
            (control) => (control.value === true ? null : { mustAccept: true }),
            'You must accept the terms and conditions',
          ),
        ],
        options: {
          labelOrientation: 'row',
        },
      },
      {
        type: 'select',
        controlName: 'gender',
        label: 'Select gender',
        placeholder: 'Choose an option',
        items: [
          { value: 'female', label: 'Female' },
          { value: 'male', label: 'Male' },
        ],
        options: {
          labelOrientation: 'row',
        },
      },
    ],
    updateOn: 'blur',
    options: {
      orientation: 'column',
      labelOrientation: 'column',
    },
  };

  onSubmit(value: UserFormModel) {
    console.log('Form submitted with value:', value);
  }
}
