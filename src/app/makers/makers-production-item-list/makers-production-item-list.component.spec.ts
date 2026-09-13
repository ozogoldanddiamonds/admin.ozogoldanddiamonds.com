import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakersProductionItemListComponent } from './makers-production-item-list.component';

describe('MakersProductionItemListComponent', () => {
  let component: MakersProductionItemListComponent;
  let fixture: ComponentFixture<MakersProductionItemListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakersProductionItemListComponent]
    });
    fixture = TestBed.createComponent(MakersProductionItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
