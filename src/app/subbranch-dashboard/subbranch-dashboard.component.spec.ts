import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubbranchDashboardComponent } from './subbranch-dashboard.component';

describe('SubbranchDashboardComponent', () => {
  let component: SubbranchDashboardComponent;
  let fixture: ComponentFixture<SubbranchDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubbranchDashboardComponent]
    });
    fixture = TestBed.createComponent(SubbranchDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
