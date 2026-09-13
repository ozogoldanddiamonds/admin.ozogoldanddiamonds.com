import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserscheemaComponent } from './view-userscheema.component';

describe('ViewUserscheemaComponent', () => {
  let component: ViewUserscheemaComponent;
  let fixture: ComponentFixture<ViewUserscheemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewUserscheemaComponent]
    });
    fixture = TestBed.createComponent(ViewUserscheemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
