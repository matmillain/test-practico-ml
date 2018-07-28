import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent {

  constructor(
    private router: Router
  ) { }

  searchItems(searchText: string) {
    if (searchText !== '') {
      this.router.navigate(['/items'], { queryParams: { search: searchText } });
    }
  }

}
