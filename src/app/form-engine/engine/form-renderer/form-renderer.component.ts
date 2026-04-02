import {
  Component,
  ChangeDetectionStrategy,
  input,
  effect,
  inject,
  computed,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormSchema } from '../../schema/form-schema.model';
import { FormBuilderService } from '../../services/form-builder.service';
import { FormFieldComponent } from '../form-field/form-field.component';
import {
  RendererRegistry,
  RENDERERS,
} from '../renderer-template-registry/renderer-template.registry';
import { TextRendererComponent } from '../text-field-renderer/text-field-renderer.component';

@Component({
  selector: 'app-form-angular',
  templateUrl: './form-renderer.component.html',
  imports: [ReactiveFormsModule, FormFieldComponent],
  providers: [
    FormBuilderService,
    RendererRegistry,
    {
      provide: RENDERERS,
      multi: true,
      useValue: {
        type: 'text',
        component: TextRendererComponent,
      },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormRendererComponent {
  formBuilder = inject(FormBuilderService);

  schema = input.required<FormSchema>();

  form = computed(() => this.formBuilder.buildForm(this.schema()));

  constructor() {
    effect(() => {
      console.log('Form schema updated:', this.schema());
      console.log('Form updated:', this.form());
    });

    effect(() => {
      console.log('Form controls:', this.form().controls);
    });
  }

  getControl(name: string): FormControl {
    return this.form().get(name) as FormControl;
  }
}
