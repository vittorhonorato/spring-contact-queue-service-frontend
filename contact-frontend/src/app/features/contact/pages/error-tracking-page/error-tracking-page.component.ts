import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ContactDetailsResponse } from '../../models/contact-details-response';
import { ContactErrorTracking } from '../../models/contact-error-tracking.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-error-tracking-page',
  templateUrl: './error-tracking-page.component.html',
  styleUrls: ['./error-tracking-page.component.scss']
})
export class ErrorTrackingPageComponent {
  displayedColumns: string[] = ['id', 'email', 'subject', 'reason', 'createdAt'];
  errors: ContactErrorTracking[] = [];
  loading = false;

  constructor(
    private readonly contactService: ContactService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadErrors();
  }

  loadErrors(): void {
    this.loading = true;
    this.contactService.getContact().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: (response: ContactDetailsResponse[]) => {
        const errorItems = response
          .filter((contact) => contact.status?.toUpperCase() === 'ERROR')
          .map((contact) => ({
            ...contact,
            reason: this.resolveErrorReason(contact)
          }))
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        this.errors = errorItems;
      },
      error: (err: HttpErrorResponse) => {
        this.errors = [];
        this.notificationService.error('Erro ao carregar tracking de erros.: ' + err.message);
      }
    });
  }

  private resolveErrorReason(contact: ContactDetailsResponse): string {
    const source = contact as ContactDetailsResponse & Record<string, unknown>;
    const candidates = [
      source['errorReason'],
      source['error_message'],
      source['errorMessage'],
      source['reason'],
      source['message']
    ];

    for (const candidate of candidates) {
      if (typeof candidate === 'string' && candidate.trim().length > 0) {
        return candidate.trim();
      }
    }

    return 'Diversos e-mails foram disparados, aguarde o processamento para atualização do status';
  }
}
