import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaKeyWordsUpsertComponent } from './meta-key-words-upsert.component';

describe('MetaKeyWordsUpsertComponent', () => {
  let component: MetaKeyWordsUpsertComponent;
  let fixture: ComponentFixture<MetaKeyWordsUpsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetaKeyWordsUpsertComponent]
    });
    fixture = TestBed.createComponent(MetaKeyWordsUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
