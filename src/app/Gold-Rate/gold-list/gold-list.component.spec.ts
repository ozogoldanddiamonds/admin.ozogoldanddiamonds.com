import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldListComponent } from './gold-list.component';

describe('GoldListComponent', () => {
  let component: GoldListComponent;
  let fixture: ComponentFixture<GoldListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoldListComponent]
    });
    fixture = TestBed.createComponent(GoldListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
