import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsearchlistComponent } from './questionsearchlist.component';

describe('QuestionsearchlistComponent', () => {
  let component: QuestionsearchlistComponent;
  let fixture: ComponentFixture<QuestionsearchlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsearchlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsearchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
