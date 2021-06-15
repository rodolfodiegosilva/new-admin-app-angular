import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminprofilepageComponent } from './adminprofilepage.component';

describe('AdminprofilepageComponent', () => {
  let component: AdminprofilepageComponent;
  let fixture: ComponentFixture<AdminprofilepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminprofilepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminprofilepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
