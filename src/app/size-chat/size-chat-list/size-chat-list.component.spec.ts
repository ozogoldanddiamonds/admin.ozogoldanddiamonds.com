import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeChatListComponent } from './size-chat-list.component';

describe('SizeChatListComponent', () => {
  let component: SizeChatListComponent;
  let fixture: ComponentFixture<SizeChatListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SizeChatListComponent]
    });
    fixture = TestBed.createComponent(SizeChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
