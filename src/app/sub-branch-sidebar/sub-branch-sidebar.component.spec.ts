import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubBranchSidebarComponent } from './sub-branch-sidebar.component';

describe('SubBranchSidebarComponent', () => {
  let component: SubBranchSidebarComponent;
  let fixture: ComponentFixture<SubBranchSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubBranchSidebarComponent]
    });
    fixture = TestBed.createComponent(SubBranchSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
