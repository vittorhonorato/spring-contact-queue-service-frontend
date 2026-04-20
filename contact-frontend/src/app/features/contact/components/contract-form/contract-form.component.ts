import { ContactService } from './../../services/contact.service';
import { ContactRequest } from '../../models/contact-request.model';
import { NotificationService } from './../../../../core/services/notification.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { delay, finalize } from 'rxjs';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.scss']
})
export class ContractFormComponent {

  loading: boolean = false;

  constructor(
    private notificationService: NotificationService,
    private contactService: ContactService,
    private readonly fb: FormBuilder
  ) { }

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

    this.loading = true;

    const payload: ContactRequest = {
      name: this.form.getRawValue().name,
      email: this.form.getRawValue().email,
      subject: this.form.getRawValue().subject,
      message: this.form.getRawValue().message,
    };

    this.contactService.postContact(payload).subscribe({
      next: (response) => {
        this.loading = false;
        this.notificationService.success('Contato enviado com sucesso. Para mais informaçoes, consulte o time de T.I atráves do seu chamado: ' + response.id);
        this.form.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.notificationService.error('Erro ao enviar contato.: ' + err.message)
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

}
