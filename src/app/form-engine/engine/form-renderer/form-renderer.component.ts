import {
  Component,
  ChangeDetectionStrategy,
  input,
  effect,
  inject,
  computed,
  output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormSchema } from '../../schema/form-schema.model';
import { FormBuilderService } from '../../services/form-builder.service';
import { FormFieldComponent } from '../form-field/form-field.component';
import {
  RendererRegistry,
  RENDERERS,
} from '../renderer-template-registry/renderer-template.registry';
import { TextRendererComponent } from '../form-field-renderers/text-field-renderer/text-field-renderer.component';
import { NumberRendererComponent } from '../form-field-renderers/number-field-renderer/number-field-renderer.component';
import { CheckboxRendererComponent } from '../form-field-renderers/checkbox-field-renderer/checkbox-field-renderer.component';
import { SelectRendererComponent } from '../form-field-renderers/select-field-renderer/select-field-renderer.component';
import { GroupRendererComponent } from '../group-renderer/group-renderer.component';
import { FORM_OPTIONS } from '../../schema/form-options-token';
import {
  DEFAULT_ERROR_FALLBACK,
  DEFAULT_ERROR_MESSAGES,
  ERROR_MESSAGES,
} from '../error-messages/error-messages.registry';

@Component({
  selector: 'app-form-angular',
  templateUrl: './form-renderer.component.html',
  imports: [ReactiveFormsModule, FormFieldComponent, GroupRendererComponent],
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
    {
      provide: RENDERERS,
      multi: true,
      useValue: {
        type: 'number',
        component: NumberRendererComponent,
      },
    },
    {
      provide: RENDERERS,
      multi: true,
      useValue: {
        type: 'checkbox',
        component: CheckboxRendererComponent,
      },
    },
    {
      provide: RENDERERS,
      multi: true,
      useValue: {
        type: 'select',
        component: SelectRendererComponent,
      },
    },
    {
      provide: FORM_OPTIONS,
      useFactory: (component: FormRendererComponent<unknown>) =>
        component.schema().options,
      deps: [FormRendererComponent],
    },
    {
      provide: ERROR_MESSAGES,
      useValue: DEFAULT_ERROR_MESSAGES,
      multi: true,
    },
    { provide: DEFAULT_ERROR_FALLBACK, useValue: 'Invalid field', multi: true },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormRendererComponent<TModel> {
  private formBuilder = inject(FormBuilderService);

  schema = input.required<FormSchema>();
  formSubmit = output<TModel>();

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

  onSubmit() {
    console.log('Form submitted with value:', this.form());

    if (this.form().valid) {
      this.formSubmit.emit(this.form().value);
    }
  }
}
