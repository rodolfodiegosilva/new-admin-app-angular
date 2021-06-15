import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsanswersuploadComponent } from './questionsanswersupload.component';

describe('QuestionsanswersuploadComponent', () => {
  let component: QuestionsanswersuploadComponent;
  let fixture: ComponentFixture<QuestionsanswersuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsanswersuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsanswersuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
