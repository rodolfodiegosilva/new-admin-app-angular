import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackssearchlistviewComponent } from './feedbackssearchlistview.component';

describe('FeedbackssearchlistviewComponent', () => {
  let component: FeedbackssearchlistviewComponent;
  let fixture: ComponentFixture<FeedbackssearchlistviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackssearchlistviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackssearchlistviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
