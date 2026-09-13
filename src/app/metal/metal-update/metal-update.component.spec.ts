import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalUpdateComponent } from './metal-update.component';

describe('MetalUpdateComponent', () => {
  let component: MetalUpdateComponent;
  let fixture: ComponentFixture<MetalUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetalUpdateComponent]
    });
    fixture = TestBed.createComponent(MetalUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
