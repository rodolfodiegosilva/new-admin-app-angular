import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdahshmenuComponent } from './sdahshmenu.component';

describe('SdahshmenuComponent', () => {
  let component: SdahshmenuComponent;
  let fixture: ComponentFixture<SdahshmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdahshmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdahshmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
