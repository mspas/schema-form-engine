import {
  Component,
  ChangeDetectionStrategy,
  input,
  effect,
  inject,
  computed,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormSchema } from '../../schema/form-schema.model';
import { FormBuilderService } from '../../services/form-builder.service';

@Component({
  selector: 'app-form-angular',
  templateUrl: './form-renderer.component.html',
  imports: [ReactiveFormsModule],
  providers: [FormBuilderService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormRendererComponent<TModel extends object> {
  formBuilder = inject(FormBuilderService);

  schema = input.required<FormSchema<TModel>>();

  form = computed(() => this.formBuilder.buildForm(this.schema()));

  constructor() {
    effect(() => {
      console.log('Form schema updated:', this.schema());
    });
  }
}
