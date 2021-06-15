import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateuserprofileadminComponent } from './createuserprofileadmin.component';

describe('CreateuserprofileadminComponent', () => {
 let component: CreateuserprofileadminComponent;
  let fixture: ComponentFixture<CreateuserprofileadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateuserprofileadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateuserprofileadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
