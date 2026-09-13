import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserscheemaComponent } from './update-userscheema.component';

describe('UpdateUserscheemaComponent', () => {
  let component: UpdateUserscheemaComponent;
  let fixture: ComponentFixture<UpdateUserscheemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUserscheemaComponent]
    });
    fixture = TestBed.createComponent(UpdateUserscheemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
