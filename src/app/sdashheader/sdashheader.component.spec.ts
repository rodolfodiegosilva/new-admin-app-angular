import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdashheaderComponent } from './sdashheader.component';

describe('SdashheaderComponent', () => {
  let component: SdashheaderComponent;
  let fixture: ComponentFixture<SdashheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdashheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdashheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
