import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSizeChartComponent } from './view-size-chart.component';

describe('ViewSizeChartComponent', () => {
  let component: ViewSizeChartComponent;
  let fixture: ComponentFixture<ViewSizeChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSizeChartComponent]
    });
    fixture = TestBed.createComponent(ViewSizeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
