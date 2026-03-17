import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormRendererComponent } from '../form-engine/engine/form-renderer/form-renderer.component';
import { FormSchema } from '../form-engine/schema/form-schema.model';

interface UserFormModel {
  firstName: string;
  age: number;
  newsletter: boolean;
}

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  imports: [FormRendererComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent {
  schema: FormSchema<UserFormModel> = {
    id: 'user-form',

    controls: [
      {
        type: 'text',
        controlName: 'firstName',
      },

      {
        type: 'number',
        controlName: 'age',
      },

      {
        type: 'checkbox',
        controlName: 'newsletter',
      },
    ],
  };
}
