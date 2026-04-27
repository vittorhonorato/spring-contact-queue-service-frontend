import { Component, Input } from '@angular/core';
import { ContactDetailsResponse } from '../../models/contact-details-response';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {
  @Input() contacts: ContactDetailsResponse[] = [];
  @Input() displayedColumns: string[] = [];

  getStatusClass(status: string): string {
    switch (status?.toUpperCase()) {
      case 'SENT':
        return 'status-badge--sent';
      case 'ERROR':
        return 'status-badge--error';
      case 'PENDING':
      default:
        return 'status-badge--pending';
    }
  }
}
