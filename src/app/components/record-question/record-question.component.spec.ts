import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordQuestionComponent } from './record-question.component';

describe('RecordQuestionComponent', () => {
  let component: RecordQuestionComponent;
  let fixture: ComponentFixture<RecordQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
