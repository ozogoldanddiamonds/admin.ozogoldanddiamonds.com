import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateScheemaComponent } from './update-scheema.component';

describe('UpdateScheemaComponent', () => {
  let component: UpdateScheemaComponent;
  let fixture: ComponentFixture<UpdateScheemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateScheemaComponent]
    });
    fixture = TestBed.createComponent(UpdateScheemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
