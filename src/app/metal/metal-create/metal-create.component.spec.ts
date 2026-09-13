import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalCreateComponent } from './metal-create.component';

describe('MetalCreateComponent', () => {
  let component: MetalCreateComponent;
  let fixture: ComponentFixture<MetalCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetalCreateComponent]
    });
    fixture = TestBed.createComponent(MetalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
