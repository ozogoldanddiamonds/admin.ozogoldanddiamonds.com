import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StonesUpdateComponent } from './stones-update.component';

describe('StonesUpdateComponent', () => {
  let component: StonesUpdateComponent;
  let fixture: ComponentFixture<StonesUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StonesUpdateComponent]
    });
    fixture = TestBed.createComponent(StonesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
