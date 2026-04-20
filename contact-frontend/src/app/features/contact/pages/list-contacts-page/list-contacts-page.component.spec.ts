import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContactsPageComponent } from './list-contacts-page.component';

describe('ListContactsPageComponent', () => {
  let component: ListContactsPageComponent;
  let fixture: ComponentFixture<ListContactsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListContactsPageComponent]
    });
    fixture = TestBed.createComponent(ListContactsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
