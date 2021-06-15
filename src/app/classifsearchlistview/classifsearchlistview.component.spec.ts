import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifsearchlistviewComponent } from './classifsearchlistview.component';

describe('ClassifsearchlistviewComponent', () => {
  let component: ClassifsearchlistviewComponent;
  let fixture: ComponentFixture<ClassifsearchlistviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassifsearchlistviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassifsearchlistviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
