import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponUpdateComponent } from './coupon-update.component';

describe('CouponUpdateComponent', () => {
  let component: CouponUpdateComponent;
  let fixture: ComponentFixture<CouponUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CouponUpdateComponent]
    });
    fixture = TestBed.createComponent(CouponUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
