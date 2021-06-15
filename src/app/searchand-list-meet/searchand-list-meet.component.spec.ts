import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchandListMeetComponent } from './searchand-list-meet.component';

describe('SearchandListMeetComponent', () => {
  let component: SearchandListMeetComponent;
  let fixture: ComponentFixture<SearchandListMeetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchandListMeetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchandListMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
