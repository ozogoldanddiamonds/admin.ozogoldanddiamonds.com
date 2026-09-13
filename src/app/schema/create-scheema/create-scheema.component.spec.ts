import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScheemaComponent } from './create-scheema.component';

describe('CreateScheemaComponent', () => {
  let component: CreateScheemaComponent;
  let fixture: ComponentFixture<CreateScheemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateScheemaComponent]
    });
    fixture = TestBed.createComponent(CreateScheemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
