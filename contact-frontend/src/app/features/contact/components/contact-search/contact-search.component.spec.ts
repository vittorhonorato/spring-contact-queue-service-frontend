import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactSearchComponent } from './contact-search.component';

describe('ContactSearchComponent', () => {
  let component: ContactSearchComponent;
  let fixture: ComponentFixture<ContactSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactSearchComponent],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ContactSearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
