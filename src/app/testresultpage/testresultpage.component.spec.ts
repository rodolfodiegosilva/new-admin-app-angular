import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestresultpageComponent } from './testresultpage.component';

describe('TestresultpageComponent', () => {
  let component: TestresultpageComponent;
  let fixture: ComponentFixture<TestresultpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestresultpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestresultpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
