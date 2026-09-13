import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpadateMakersComponent } from './upadate-makers.component';

describe('UpadateMakersComponent', () => {
  let component: UpadateMakersComponent;
  let fixture: ComponentFixture<UpadateMakersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpadateMakersComponent]
    });
    fixture = TestBed.createComponent(UpadateMakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
