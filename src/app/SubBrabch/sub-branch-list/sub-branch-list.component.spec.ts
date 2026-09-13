import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubBranchListComponent } from './sub-branch-list.component';

describe('SubBranchListComponent', () => {
  let component: SubBranchListComponent;
  let fixture: ComponentFixture<SubBranchListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubBranchListComponent]
    });
    fixture = TestBed.createComponent(SubBranchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
