import {
  Component,
  ChangeDetectionStrategy,
  input,
  inject,
  OnInit,
  DestroyRef,
  signal,
  computed,
} from '@angular/core';
import {
  AbstractControl,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { ControlSchema } from '../../schema/form-control.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged } from 'rxjs';
import { ErrorMessageService } from '../error-messages/error-messages.service';
import { ErrorMessageRegistry } from '../error-messages/error-messages.registry';

@Component({
  selector: 'app-error-renderer',
  templateUrl: './error-renderer.component.html',
  imports: [ReactiveFormsModule],
  providers: [ErrorMessageService, ErrorMessageRegistry],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorRendererComponent implements OnInit {
  control = input.required<AbstractControl>();
  controlSchema = input.required<ControlSchema>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly errorMessageService = inject(ErrorMessageService);

  controlErrors = signal<ValidationErrors | null>(null);
  errorMessages = computed(() => {
    const errors = this.controlErrors();
    console.log(errors);

    return !!errors && !!this.controlSchema().validators
      ? this.errorMessageService.getErrorMessages(
          this.control(),
          this.controlSchema().validators!,
        )
      : null;
  });

  ngOnInit(): void {
    this.control()
      .statusChanges.pipe(
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.controlErrors.set(this.control().errors));
  }
}
