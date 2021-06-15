import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateadminprofileComponent } from './createadminprofile.component';

describe('CreateadminprofileComponent', () => {
 let component: CreateadminprofileComponent;
  let fixture: ComponentFixture<CreateadminprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateadminprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateadminprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
