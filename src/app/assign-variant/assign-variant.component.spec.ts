import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignVariantComponent } from './assign-variant.component';

describe('AssignVariantComponent', () => {
  let component: AssignVariantComponent;
  let fixture: ComponentFixture<AssignVariantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignVariantComponent]
    });
    fixture = TestBed.createComponent(AssignVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
