import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetCreatePageComponent } from './meet-create-page.component';

describe('MeetCreatePageComponent', () => {
  let component: MeetCreatePageComponent;
  let fixture: ComponentFixture<MeetCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetCreatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
