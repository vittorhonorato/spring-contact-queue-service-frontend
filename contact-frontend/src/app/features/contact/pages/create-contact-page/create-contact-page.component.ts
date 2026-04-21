import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ContractFormComponent } from '../../components/contract-form/contract-form.component';
import { ContactRequest } from '../../models/contact-request.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-create-contact-page',
  templateUrl: './create-contact-page.component.html',
  styleUrls: ['./create-contact-page.component.scss']
})
export class CreateContactPageComponent {
  @ViewChild(ContractFormComponent)
  private contractFormComponent?: ContractFormComponent;

  loading = false;

  constructor(
    private readonly notificationService: NotificationService,
    private readonly contactService: ContactService,
    private readonly router: Router
  ) {}

  submit(payload: ContactRequest): void {
    this.loading = true;

    this.contactService.postContact(payload).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: (response) => {
        this.notificationService.success(
          'Contato enviado com sucesso. Para mais informaçoes, consulte o time de T.I atráves do seu chamado: ' + response.id
        );
        this.contractFormComponent?.resetForm();
        this.router.navigate(['/list-all']);
      },
      error: (err: HttpErrorResponse) => {
        this.notificationService.error('Erro ao enviar contato.: ' + err.message);
      }
    });
  }
}
