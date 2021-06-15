import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagemeetComponent } from './managemeet.component';

describe('ManagemeetComponent', () => {
  let component: ManagemeetComponent;
  let fixture: ComponentFixture<ManagemeetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagemeetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagemeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
