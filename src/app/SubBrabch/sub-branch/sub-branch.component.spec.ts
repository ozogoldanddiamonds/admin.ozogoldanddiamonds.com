import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubBranchComponent } from './sub-branch.component';

describe('SubBranchComponent', () => {
  let component: SubBranchComponent;
  let fixture: ComponentFixture<SubBranchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubBranchComponent]
    });
    fixture = TestBed.createComponent(SubBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
