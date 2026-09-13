import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMakersComponent } from './create-makers.component';

describe('CreateMakersComponent', () => {
  let component: CreateMakersComponent;
  let fixture: ComponentFixture<CreateMakersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMakersComponent]
    });
    fixture = TestBed.createComponent(CreateMakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
