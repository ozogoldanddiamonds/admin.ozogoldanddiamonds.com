import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBranchOrdersComponent } from './main-branch-orders.component';

describe('MainBranchOrdersComponent', () => {
  let component: MainBranchOrdersComponent;
  let fixture: ComponentFixture<MainBranchOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainBranchOrdersComponent]
    });
    fixture = TestBed.createComponent(MainBranchOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
