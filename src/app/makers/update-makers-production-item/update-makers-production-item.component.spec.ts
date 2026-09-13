import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMakersProductionItemComponent } from './update-makers-production-item.component';

describe('UpdateMakersProductionItemComponent', () => {
  let component: UpdateMakersProductionItemComponent;
  let fixture: ComponentFixture<UpdateMakersProductionItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMakersProductionItemComponent]
    });
    fixture = TestBed.createComponent(UpdateMakersProductionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
