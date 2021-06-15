import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussonsearhlistviewComponent } from './discussonsearhlistview.component';

describe('DiscussonsearhlistviewComponent', () => {
  let component: DiscussonsearhlistviewComponent;
  let fixture: ComponentFixture<DiscussonsearhlistviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussonsearhlistviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussonsearhlistviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
