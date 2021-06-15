import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminfooterComponent } from './sadminfooter.component';

describe('SadminfooterComponent', () => {
  let component: SadminfooterComponent;
  let fixture: ComponentFixture<SadminfooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadminfooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadminfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
