import { LoaderService } from './../../../common/loader/loader.service';
import { HttpClientModule } from '@angular/common/http';
import { ItemsServices } from './../../../services/items.service';
import { HandleErrorsComponent } from './../../../common/handle-errors/handle-errors.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailComponent } from './item-detail.component';
import { LoaderComponent } from '../../../common/loader/loader.component';
import { ItemCategoriesComponent } from '../item-categories/item-categories.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ItemDetailComponent', () => {
  let component: ItemDetailComponent;
  let fixture: ComponentFixture<ItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        ItemDetailComponent,
        LoaderComponent,
        ItemCategoriesComponent,
        HandleErrorsComponent
      ],
      providers: [
        ItemsServices,
        LoaderService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create item detail component', () => {
    expect(component).toBeTruthy();
  });

  it('should have <app-loader-spinner> component', async(() => {
    fixture = TestBed.createComponent(ItemDetailComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-loader-spinner')).not.toBe(null);
  }));

  it('should have <app-item-categories> component', async(() => {
    fixture = TestBed.createComponent(ItemDetailComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-item-categories')).not.toBe(null);
  }));

  it('should have <app-handle-errors> component', async(() => {
    fixture = TestBed.createComponent(ItemDetailComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-handle-errors')).toBe(null);
  }));
});
