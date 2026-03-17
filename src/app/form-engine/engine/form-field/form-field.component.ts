import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilderService } from '../../services/form-builder.service';
import { ControlSchema } from '../../schema/form-control.model';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  imports: [ReactiveFormsModule, NgTemplateOutlet],
  providers: [FormBuilderService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent<TModel extends object> {
  control = input.required<FormControl>();
  schema = input.required<ControlSchema<TModel>>();

  template = null;
}
