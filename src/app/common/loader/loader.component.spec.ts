import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';
import { CommonModule } from '@angular/common';
import { LoaderService } from './loader.service';

describe('LoaderComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule
      ],
      declarations: [
        LoaderComponent
      ],
      providers: [
        LoaderService
      ],
    }).compileComponents();
  }));
  it('should create the loader component', async(() => {
    const fixture = TestBed.createComponent(LoaderComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
