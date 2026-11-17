import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderShipmentComponent } from './order-shipment.component';

describe('OrderShipmentComponent', () => {
  let component: OrderShipmentComponent;
  let fixture: ComponentFixture<OrderShipmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderShipmentComponent]
    });
    fixture = TestBed.createComponent(OrderShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
