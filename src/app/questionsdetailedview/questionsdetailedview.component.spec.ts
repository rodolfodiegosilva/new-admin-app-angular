import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsdetailedviewComponent } from './questionsdetailedview.component';

describe('QuestionsdetailedviewComponent', () => {
  let component: QuestionsdetailedviewComponent;
  let fixture: ComponentFixture<QuestionsdetailedviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsdetailedviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsdetailedviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
