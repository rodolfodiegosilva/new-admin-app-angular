import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RgesterComponent } from './rgester.component';

describe('RgesterComponent', () => {
  let component: RgesterComponent;
  let fixture: ComponentFixture<RgesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RgesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RgesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
