import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { finalize } from 'rxjs';
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

  searchContactById(id: string): void {
    this.loading = true;
    this.contactService.getContactById(id).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: (response: ContactDetailsResponse) => {
        this.contacts = [response];
      },
      error: (err: HttpErrorResponse) => {
        this.contacts = [];
        this.notificationService.error('Erro ao buscar contato.: ' + err.message);
      }
    });
  }
}
