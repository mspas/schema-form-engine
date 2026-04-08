import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormRendererComponent } from '../form-engine/engine/form-renderer/form-renderer.component';
import { FormSchema } from '../form-engine/schema/form-schema.model';

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
          },
          {
            type: 'text',
            controlName: 'lastName',
            label: 'Last Name',
            placeholder: 'Enter your last name',
          },
        ],
      },
      {
        type: 'number',
        controlName: 'age',
        label: 'Age',
        placeholder: 'Enter your age',
      },
      {
        type: 'checkbox',
        controlName: 'newsletter',
        label: 'Subscribe to newsletter',
      },
      {
        type: 'select',
        controlName: 'gender',
        label: 'Select gender',
        placeholder: 'Choose an option',
        options: [
          { value: 'female', label: 'Female' },
          { value: 'male', label: 'Male' },
        ],
      },
    ],
  };

  onSubmit(value: UserFormModel) {
    console.log('Form submitted with value:', value);
  }
}
