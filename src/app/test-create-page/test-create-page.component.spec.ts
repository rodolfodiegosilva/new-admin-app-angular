import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCreatePageComponent } from './test-create-page.component';

describe('TestCreatePageComponent', () => {
  let component: TestCreatePageComponent;
  let fixture: ComponentFixture<TestCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCreatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
