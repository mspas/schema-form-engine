import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  FieldRenderer,
  CheckboxControlSchema,
} from '../../../schema/form-control.model';

@Component({
  selector: 'app-checkbox-renderer',
  template: `
    <input data-test="checkbox-input" type="checkbox" [formControl]="control" />
  `,
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class CheckboxRendererComponent implements FieldRenderer<CheckboxControlSchema> {
  @Input() control!: FormControl;
  @Input() controlSchema!: CheckboxControlSchema;
}
