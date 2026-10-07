import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDesignViewComponent } from './custom-design-view.component';

describe('CustomDesignViewComponent', () => {
  let component: CustomDesignViewComponent;
  let fixture: ComponentFixture<CustomDesignViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomDesignViewComponent]
    });
    fixture = TestBed.createComponent(CustomDesignViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
