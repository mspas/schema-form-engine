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

  registry = inject(RendererRegistry);

  componentType = computed(() => this.registry.get(this.controlSchema().type));
}
