import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSubCategoryUpdateComponent } from './sub-sub-category-update.component';

describe('SubSubCategoryUpdateComponent', () => {
  let component: SubSubCategoryUpdateComponent;
  let fixture: ComponentFixture<SubSubCategoryUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubSubCategoryUpdateComponent]
    });
    fixture = TestBed.createComponent(SubSubCategoryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
