import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionmanageviewComponent } from './questionmanageview.component';

describe('QuestionmanageviewComponent', () => {
  let component: QuestionmanageviewComponent;
  let fixture: ComponentFixture<QuestionmanageviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionmanageviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionmanageviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
