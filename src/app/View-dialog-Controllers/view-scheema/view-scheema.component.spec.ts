import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewScheemaComponent } from './view-scheema.component';

describe('ViewScheemaComponent', () => {
  let component: ViewScheemaComponent;
  let fixture: ComponentFixture<ViewScheemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewScheemaComponent]
    });
    fixture = TestBed.createComponent(ViewScheemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
