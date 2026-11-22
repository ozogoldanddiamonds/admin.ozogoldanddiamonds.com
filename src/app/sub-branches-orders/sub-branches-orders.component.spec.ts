import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubBranchesOrdersComponent } from './sub-branches-orders.component';

describe('SubBranchesOrdersComponent', () => {
  let component: SubBranchesOrdersComponent;
  let fixture: ComponentFixture<SubBranchesOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubBranchesOrdersComponent]
    });
    fixture = TestBed.createComponent(SubBranchesOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
