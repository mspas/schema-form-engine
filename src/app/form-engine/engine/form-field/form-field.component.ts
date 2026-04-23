import {
  Component,
  ChangeDetectionStrategy,
  input,
  inject,
  computed,
  OnInit,
  signal,
  DestroyRef,
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilderService } from '../../services/form-builder.service';
import { ControlSchema } from '../../schema/form-control.model';
import { RendererRegistry } from '../renderer-template-registry/renderer-template.registry';
import { FORM_OPTIONS } from '../../schema/form-options-token';
import { ORIENTATION_OPTIONS } from '../../schema/form-options.model';
import { debouncedValueChanges } from '../../utils/debouncedSignal';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  imports: [ReactiveFormsModule, NgComponentOutlet],
  providers: [FormBuilderService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent implements OnInit {
  control = input.required<AbstractControl>();
  controlSchema = input.required<ControlSchema>();

  readonly VALUE_CHANGE_DELAY = 300;
  private readonly registry = inject(RendererRegistry);
  private readonly formOptions = inject(FORM_OPTIONS, { optional: true });
  private readonly destroyRef = inject(DestroyRef);

  componentType = computed(() => this.registry.get(this.controlSchema().type));

  labelOrientation = computed(
    () =>
      this.controlSchema().options?.labelOrientation ??
      this.formOptions?.labelOrientation ??
      ORIENTATION_OPTIONS.column,
  );

  valueChanges = signal(null);

  ngOnInit(): void {
    debouncedValueChanges(
      this.control().valueChanges,
      this.VALUE_CHANGE_DELAY,
      this.destroyRef,
    ).subscribe((value) => {
      this.valueChanges.set(value);
    });
  }
}
