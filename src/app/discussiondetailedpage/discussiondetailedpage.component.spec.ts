import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussiondetailedpageComponent } from './discussiondetailedpage.component';

describe('DiscussiondetailedpageComponent', () => {
  let component: DiscussiondetailedpageComponent;
  let fixture: ComponentFixture<DiscussiondetailedpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussiondetailedpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussiondetailedpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
