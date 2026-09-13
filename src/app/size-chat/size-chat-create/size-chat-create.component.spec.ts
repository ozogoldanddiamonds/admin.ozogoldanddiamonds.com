import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeChatCreateComponent } from './size-chat-create.component';

describe('SizeChatCreateComponent', () => {
  let component: SizeChatCreateComponent;
  let fixture: ComponentFixture<SizeChatCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SizeChatCreateComponent]
    });
    fixture = TestBed.createComponent(SizeChatCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
