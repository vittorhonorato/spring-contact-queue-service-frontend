import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ContactService } from '../../services/contact.service';

import { ListContactsPageComponent } from './list-contacts-page.component';

describe('ListContactsPageComponent', () => {
  let component: ListContactsPageComponent;
  let fixture: ComponentFixture<ListContactsPageComponent>;
  const contactServiceMock = {
    getContact: jasmine.createSpy('getContact').and.returnValue(of([])),
    getContactById: jasmine.createSpy('getContactById')
  };
  const notificationServiceMock = {
    error: jasmine.createSpy('error')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListContactsPageComponent],
      providers: [
        { provide: ContactService, useValue: contactServiceMock },
        { provide: NotificationService, useValue: notificationServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ListContactsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
