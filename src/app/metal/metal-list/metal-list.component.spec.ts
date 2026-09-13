import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalListComponent } from './metal-list.component';

describe('MetalListComponent', () => {
  let component: MetalListComponent;
  let fixture: ComponentFixture<MetalListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetalListComponent]
    });
    fixture = TestBed.createComponent(MetalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
