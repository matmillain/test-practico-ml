import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleErrorsComponent } from './handle-errors.component';

describe('HandleErrorsComponent', () => {
  let component: HandleErrorsComponent;
  let fixture: ComponentFixture<HandleErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandleErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandleErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the handle errors component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a class `message` in div', () => {
    fixture = TestBed.createComponent(HandleErrorsComponent);
    const result = fixture.nativeElement.querySelector('div');
    expect(result.getAttribute('class')).toContain('message');
  });
});
