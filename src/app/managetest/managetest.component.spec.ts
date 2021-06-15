import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagetestComponent } from './managetest.component';

describe('ManagetestComponent', () => {
  let component: ManagetestComponent;
  let fixture: ComponentFixture<ManagetestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagetestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
