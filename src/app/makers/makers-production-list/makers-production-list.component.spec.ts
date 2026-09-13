import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakersProductionListComponent } from './makers-production-list.component';

describe('MakersProductionListComponent', () => {
  let component: MakersProductionListComponent;
  let fixture: ComponentFixture<MakersProductionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakersProductionListComponent]
    });
    fixture = TestBed.createComponent(MakersProductionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
