import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeChatUpdateComponent } from './size-chat-update.component';

describe('SizeChatUpdateComponent', () => {
  let component: SizeChatUpdateComponent;
  let fixture: ComponentFixture<SizeChatUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SizeChatUpdateComponent]
    });
    fixture = TestBed.createComponent(SizeChatUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
