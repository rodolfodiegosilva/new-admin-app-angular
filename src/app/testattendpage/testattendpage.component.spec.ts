import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestattendpageComponent } from './testattendpage.component';

describe('TestattendpageComponent', () => {
  let component: TestattendpageComponent;
  let fixture: ComponentFixture<TestattendpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestattendpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestattendpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
