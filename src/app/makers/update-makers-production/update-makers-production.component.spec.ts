import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMakersProductionComponent } from './update-makers-production.component';

describe('UpdateMakersProductionComponent', () => {
  let component: UpdateMakersProductionComponent;
  let fixture: ComponentFixture<UpdateMakersProductionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMakersProductionComponent]
    });
    fixture = TestBed.createComponent(UpdateMakersProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
