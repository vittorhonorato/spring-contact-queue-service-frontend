import { ContactRequest } from '../../models/contact-request.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.scss']
})
export class ContractFormComponent {
  @Input() loading = false;
  @Output() formSubmit = new EventEmitter<ContactRequest>();

  constructor(private readonly fb: FormBuilder) { }

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required, Validators.minLength(5)]]
  });

  submit(): void {

    if(this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    const payload: ContactRequest = {
      name: this.form.getRawValue().name,
      email: this.form.getRawValue().email,
      subject: this.form.getRawValue().subject,
      message: this.form.getRawValue().message,
    };

    this.formSubmit.emit(payload);
  }

  resetForm(): void {
    this.form.reset();
  }

}
