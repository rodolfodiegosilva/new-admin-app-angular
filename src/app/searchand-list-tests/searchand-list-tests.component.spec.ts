import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchandListTestsComponent } from './searchand-list-tests.component';

describe('SearchandListTestsComponent', () => {
  let component: SearchandListTestsComponent;
  let fixture: ComponentFixture<SearchandListTestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchandListTestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchandListTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
