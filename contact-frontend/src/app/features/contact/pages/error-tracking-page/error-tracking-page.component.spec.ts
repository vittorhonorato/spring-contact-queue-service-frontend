import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ContactService } from '../../services/contact.service';

import { ErrorTrackingPageComponent } from './error-tracking-page.component';

describe('ErrorTrackingPageComponent', () => {
  let component: ErrorTrackingPageComponent;
  let fixture: ComponentFixture<ErrorTrackingPageComponent>;
  const contactServiceMock = {
    getContact: jasmine.createSpy('getContact').and.returnValue(of([]))
  };
  const notificationServiceMock = {
    error: jasmine.createSpy('error')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorTrackingPageComponent],
      providers: [
        { provide: ContactService, useValue: contactServiceMock },
        { provide: NotificationService, useValue: notificationServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ErrorTrackingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
