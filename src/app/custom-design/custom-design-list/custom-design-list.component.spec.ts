import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDesignListComponent } from './custom-design-list.component';

describe('CustomDesignListComponent', () => {
  let component: CustomDesignListComponent;
  let fixture: ComponentFixture<CustomDesignListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomDesignListComponent]
    });
    fixture = TestBed.createComponent(CustomDesignListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
