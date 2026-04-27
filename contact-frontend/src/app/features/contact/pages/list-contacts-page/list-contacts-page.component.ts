import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ContactService } from '../../services/contact.service';
import { ContactDetailsResponse } from '../../models/contact-details-response';


@Component({
  selector: 'app-list-contacts-page',
  templateUrl: './list-contacts-page.component.html',
  styleUrls: ['./list-contacts-page.component.scss']
})
export class ListContactsPageComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'subject', 'status', 'createdAt'];
  contacts: ContactDetailsResponse[] = [];
  loading = false;
  private readonly emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(
    private readonly contactService: ContactService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadAllContacts();
  }

  loadAllContacts(): void {
    this.loading = true;
    this.contactService.getContact().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: (response: ContactDetailsResponse[]) => {
        this.contacts = response;
      },
      error: (err: HttpErrorResponse) => {
        this.contacts = [];
        this.notificationService.error('Erro ao carregar contatos.: ' + err.message);
      }
    });
  }

  searchContact(query: string): void {
    const normalizedQuery = query.trim();
    if (!normalizedQuery) {
      return;
    }

    if (this.emailPattern.test(normalizedQuery)) {
      this.searchSingleContact(
        this.contactService.getContactByEmail(normalizedQuery),
        'Erro ao buscar contato por e-mail.: ',
        normalizedQuery.toLowerCase()
      );
      return;
    }

    this.searchSingleContact(
      this.contactService.getContactById(normalizedQuery),
      'Erro ao buscar contato por ID.: '
    );
  }

  private searchSingleContact(
    request$: Observable<ContactDetailsResponse | ContactDetailsResponse[]>,
    errorPrefix: string,
    expectedEmail?: string
  ): void {
    this.loading = true;
    request$.pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: (response: ContactDetailsResponse | ContactDetailsResponse[]) => {
        const normalizedContacts = Array.isArray(response) ? response : [response];
        this.contacts = expectedEmail
          ? normalizedContacts.filter((contact) => contact.email.toLowerCase() === expectedEmail)
          : normalizedContacts;
      },
      error: (err: HttpErrorResponse) => {
        this.contacts = [];
        this.notificationService.error(errorPrefix + err.message);
      }
    });
  }
}
