import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMakersProductionComponent } from './create-makers-production.component';

describe('CreateMakersProductionComponent', () => {
  let component: CreateMakersProductionComponent;
  let fixture: ComponentFixture<CreateMakersProductionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMakersProductionComponent]
    });
    fixture = TestBed.createComponent(CreateMakersProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
