import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserscheemaComponent } from './create-userscheema.component';

describe('CreateUserscheemaComponent', () => {
  let component: CreateUserscheemaComponent;
  let fixture: ComponentFixture<CreateUserscheemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUserscheemaComponent]
    });
    fixture = TestBed.createComponent(CreateUserscheemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
