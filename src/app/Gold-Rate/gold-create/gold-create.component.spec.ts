import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldCreateComponent } from './gold-create.component';

describe('GoldCreateComponent', () => {
  let component: GoldCreateComponent;
  let fixture: ComponentFixture<GoldCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoldCreateComponent]
    });
    fixture = TestBed.createComponent(GoldCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
