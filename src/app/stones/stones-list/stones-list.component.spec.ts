import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StonesListComponent } from './stones-list.component';

describe('StonesListComponent', () => {
  let component: StonesListComponent;
  let fixture: ComponentFixture<StonesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StonesListComponent]
    });
    fixture = TestBed.createComponent(StonesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
