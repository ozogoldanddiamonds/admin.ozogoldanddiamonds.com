import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSchemaComponent } from './list-schema.component';

describe('ListSchemaComponent', () => {
  let component: ListSchemaComponent;
  let fixture: ComponentFixture<ListSchemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSchemaComponent]
    });
    fixture = TestBed.createComponent(ListSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
