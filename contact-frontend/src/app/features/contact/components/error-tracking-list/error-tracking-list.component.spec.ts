import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorTrackingListComponent } from './error-tracking-list.component';

describe('ErrorTrackingListComponent', () => {
  let component: ErrorTrackingListComponent;
  let fixture: ComponentFixture<ErrorTrackingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorTrackingListComponent]
    });
    fixture = TestBed.createComponent(ErrorTrackingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
