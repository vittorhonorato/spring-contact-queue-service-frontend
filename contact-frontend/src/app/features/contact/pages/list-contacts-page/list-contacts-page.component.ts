import { Component } from '@angular/core';
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

  constructor(private readonly contactService: ContactService) {}

  ngOnInit() {
    this.getAll();
  }


  getAll() {
    this.contactService.getContact().subscribe({
      next: (response: ContactDetailsResponse[]) => {
        this.contacts = response;
      },
      error: (err) => {

      }
    })
  }
}
