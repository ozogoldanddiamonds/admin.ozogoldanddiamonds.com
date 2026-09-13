import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSubCategoryCreateComponent } from './sub-sub-category-create.component';

describe('SubSubCategoryCreateComponent', () => {
  let component: SubSubCategoryCreateComponent;
  let fixture: ComponentFixture<SubSubCategoryCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubSubCategoryCreateComponent]
    });
    fixture = TestBed.createComponent(SubSubCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
