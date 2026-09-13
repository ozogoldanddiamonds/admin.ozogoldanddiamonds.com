import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMakersProductionItemComponent } from './create-makers-production-item.component';

describe('CreateMakersProductionItemComponent', () => {
  let component: CreateMakersProductionItemComponent;
  let fixture: ComponentFixture<CreateMakersProductionItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMakersProductionItemComponent]
    });
    fixture = TestBed.createComponent(CreateMakersProductionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
