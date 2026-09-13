import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldUpdateComponent } from './gold-update.component';

describe('GoldUpdateComponent', () => {
  let component: GoldUpdateComponent;
  let fixture: ComponentFixture<GoldUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoldUpdateComponent]
    });
    fixture = TestBed.createComponent(GoldUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
