import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StonesCreateComponent } from './stones-create.component';

describe('StonesCreateComponent', () => {
  let component: StonesCreateComponent;
  let fixture: ComponentFixture<StonesCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StonesCreateComponent]
    });
    fixture = TestBed.createComponent(StonesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
