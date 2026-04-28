import { Component, Input } from '@angular/core';
import { ContactErrorTracking } from '../../models/contact-error-tracking.model';

@Component({
  selector: 'app-error-tracking-list',
  templateUrl: './error-tracking-list.component.html',
  styleUrls: ['./error-tracking-list.component.scss']
})
export class ErrorTrackingListComponent {
  @Input() errors: ContactErrorTracking[] = [];
  @Input() displayedColumns: string[] = [];
}
