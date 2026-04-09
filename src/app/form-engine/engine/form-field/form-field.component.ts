import {
  Component,
  ChangeDetectionStrategy,
  input,
  inject,
  computed,
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilderService } from '../../services/form-builder.service';
import { ControlSchema } from '../../schema/form-control.model';
import { RendererRegistry } from '../renderer-template-registry/renderer-template.registry';
import { FORM_OPTIONS } from '../../schema/form-options-token';
import { ORIENTATION_OPTIONS } from '../../schema/form-options.model';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  imports: [ReactiveFormsModule, NgComponentOutlet],
  providers: [FormBuilderService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent {
  control = input.required<AbstractControl>();
  controlSchema = input.required<ControlSchema>();

  private registry = inject(RendererRegistry);
  private formOptions = inject(FORM_OPTIONS, { optional: true });

  componentType = computed(() => this.registry.get(this.controlSchema().type));

  labelOrientation = computed(
    () =>
      this.controlSchema().options?.labelOrientation ??
      this.formOptions?.labelOrientation ??
      ORIENTATION_OPTIONS.column,
  );
}
