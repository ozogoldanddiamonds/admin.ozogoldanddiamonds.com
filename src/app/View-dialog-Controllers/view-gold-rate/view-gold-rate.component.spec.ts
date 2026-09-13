import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGoldRateComponent } from './view-gold-rate.component';

describe('ViewGoldRateComponent', () => {
  let component: ViewGoldRateComponent;
  let fixture: ComponentFixture<ViewGoldRateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewGoldRateComponent]
    });
    fixture = TestBed.createComponent(ViewGoldRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
