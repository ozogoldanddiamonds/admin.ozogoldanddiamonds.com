import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaKeyWordsComponent } from './meta-key-words.component';

describe('MetaKeyWordsComponent', () => {
  let component: MetaKeyWordsComponent;
  let fixture: ComponentFixture<MetaKeyWordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetaKeyWordsComponent]
    });
    fixture = TestBed.createComponent(MetaKeyWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
