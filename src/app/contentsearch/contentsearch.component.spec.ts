import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsearchComponent } from './contentsearch.component';

describe('ContentsearchComponent', () => {
  let component: ContentsearchComponent;
  let fixture: ComponentFixture<ContentsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
