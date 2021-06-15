import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContntuploadmanageComponent } from './contntuploadmanage.component';

describe('ContntuploadmanageComponent', () => {
  let component: ContntuploadmanageComponent;
  let fixture: ComponentFixture<ContntuploadmanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContntuploadmanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContntuploadmanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
