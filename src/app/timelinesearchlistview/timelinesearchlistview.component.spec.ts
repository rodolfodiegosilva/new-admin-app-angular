import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinesearchlistviewComponent } from './timelinesearchlistview.component';

describe('TimelinesearchlistviewComponent', () => {
  let component: TimelinesearchlistviewComponent;
  let fixture: ComponentFixture<TimelinesearchlistviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelinesearchlistviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinesearchlistviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
