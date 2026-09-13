import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderItemComponent } from './view-order-item.component';

describe('ViewOrderItemComponent', () => {
  let component: ViewOrderItemComponent;
  let fixture: ComponentFixture<ViewOrderItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewOrderItemComponent]
    });
    fixture = TestBed.createComponent(ViewOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
