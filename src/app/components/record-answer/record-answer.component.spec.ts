import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordAnswerComponent } from './record-answer.component';

describe('RecordAnswerComponent', () => {
  let component: RecordAnswerComponent;
  let fixture: ComponentFixture<RecordAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
