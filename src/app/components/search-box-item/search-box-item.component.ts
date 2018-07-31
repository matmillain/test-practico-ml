import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

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
      // Refresh content on the current router
      const navigationExtras: NavigationExtras = {
        queryParams: { search: searchText }
      };
      this.router.navigate(['/items'], navigationExtras);
    }
  }

}
