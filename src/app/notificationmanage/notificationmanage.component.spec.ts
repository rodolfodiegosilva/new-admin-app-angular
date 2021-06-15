import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationmanageComponent } from './notificationmanage.component';

describe('NotificationmanageComponent', () => {
  let component: NotificationmanageComponent;
  let fixture: ComponentFixture<NotificationmanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationmanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationmanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
