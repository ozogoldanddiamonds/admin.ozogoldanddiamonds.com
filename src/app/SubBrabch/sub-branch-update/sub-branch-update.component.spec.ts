import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubBranchUpdateComponent } from './sub-branch-update.component';

describe('SubBranchUpdateComponent', () => {
  let component: SubBranchUpdateComponent;
  let fixture: ComponentFixture<SubBranchUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubBranchUpdateComponent]
    });
    fixture = TestBed.createComponent(SubBranchUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
