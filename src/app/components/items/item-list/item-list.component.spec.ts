import { LoaderModule } from './../../../common/loader/loader.module';
import { HttpClientModule } from '@angular/common/http';
import { ItemsServices } from './../../../services/items.service';
import { HandleErrorsComponent } from './../../../common/handle-errors/handle-errors.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ItemListComponent } from './item-list.component';
import { ItemCategoriesComponent } from '../item-categories/item-categories.component';

describe('ItemsListsComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        LoaderModule
      ],
      declarations: [
        ItemListComponent,
        ItemCategoriesComponent,
        HandleErrorsComponent
      ],
      providers: [
        ItemsServices
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the item list component', () => {
    expect(component).toBeTruthy();
  });

  it('should have <app-loader-spinner> component', async(() => {
    fixture = TestBed.createComponent(ItemListComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-loader-spinner')).not.toBe(null);
  }));

  it('should have <app-item-categories> component', async(() => {
    fixture = TestBed.createComponent(ItemListComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-item-categories')).toBe(null);
  }));

  it('should have <app-handle-errors> component', async(() => {
    fixture = TestBed.createComponent(ItemListComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-handle-errors')).toBe(null);
  }));
});
