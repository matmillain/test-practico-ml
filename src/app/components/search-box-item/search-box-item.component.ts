import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-box-item',
  templateUrl: './search-box-item.component.html',
  styleUrls: ['./search-box-item.component.scss']
})
export class SearchBoxItemComponent {

  constructor(
    private router: Router
  ) { }

  searchItems(searchText: string) {
    if (searchText !== '') {
      this.router.navigate(['/items'], { queryParams: { search: searchText } });
    }
  }

}
