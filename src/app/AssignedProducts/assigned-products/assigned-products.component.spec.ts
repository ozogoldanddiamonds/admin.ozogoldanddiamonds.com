import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedProductsComponent } from './assigned-products.component';

describe('AssignedProductsComponent', () => {
  let component: AssignedProductsComponent;
  let fixture: ComponentFixture<AssignedProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignedProductsComponent]
    });
    fixture = TestBed.createComponent(AssignedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
