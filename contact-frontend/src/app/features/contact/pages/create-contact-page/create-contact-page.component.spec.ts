import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ContactService } from '../../services/contact.service';

import { CreateContactPageComponent } from './create-contact-page.component';

describe('CreateContactPageComponent', () => {
  let component: CreateContactPageComponent;
  let fixture: ComponentFixture<CreateContactPageComponent>;
  const contactServiceMock = {
    postContact: jasmine.createSpy('postContact').and.returnValue(of({
      id: '1',
      status: 'SENT',
      message: 'ok',
      createdAt: new Date().toISOString()
    }))
  };
  const notificationServiceMock = {
    success: jasmine.createSpy('success'),
    error: jasmine.createSpy('error')
  };
  const routerMock = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateContactPageComponent],
      providers: [
        { provide: ContactService, useValue: contactServiceMock },
        { provide: NotificationService, useValue: notificationServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(CreateContactPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
