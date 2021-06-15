import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstutesmanageComponent } from './instutesmanage.component';

describe('InstutesmanageComponent', () => {
 let component: InstutesmanageComponent;
  let fixture: ComponentFixture<InstutesmanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstutesmanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstutesmanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
