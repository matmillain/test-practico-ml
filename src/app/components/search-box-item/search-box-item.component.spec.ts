import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchBoxItemComponent } from './search-box-item.component';

describe('SearchItemComponent', () => {
  let component: SearchBoxItemComponent;
  let fixture: ComponentFixture<SearchBoxItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        SearchBoxItemComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the search box item component', () => {
    expect(component).toBeTruthy();
  });
});
