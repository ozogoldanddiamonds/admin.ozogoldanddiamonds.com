import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaViewDetailsComponent } from './meta-view-details.component';

describe('MetaViewDetailsComponent', () => {
  let component: MetaViewDetailsComponent;
  let fixture: ComponentFixture<MetaViewDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetaViewDetailsComponent]
    });
    fixture = TestBed.createComponent(MetaViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
