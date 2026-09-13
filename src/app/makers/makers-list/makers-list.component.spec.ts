import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakersListComponent } from './makers-list.component';

describe('MakersListComponent', () => {
  let component: MakersListComponent;
  let fixture: ComponentFixture<MakersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakersListComponent]
    });
    fixture = TestBed.createComponent(MakersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
