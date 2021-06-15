import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagegemsinstuteComponent } from './managegemsinstute.component';

describe('ManagegemsinstuteComponent', () => {
  let component: ManagegemsinstuteComponent;
  let fixture: ComponentFixture<ManagegemsinstuteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagegemsinstuteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagegemsinstuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
