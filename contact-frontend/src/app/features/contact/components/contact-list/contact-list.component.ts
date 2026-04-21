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
}
