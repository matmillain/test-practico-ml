import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  checkSearchText = '';

  constructor(
    private router: Router
  ) { }

  searchItems(searchText: string) {
    if (searchText !== '') {
      this.checkSearchText = searchText; // Set value to checkSearchText
      this.router.navigate(['/items'], { queryParams: { search: searchText } });
    }
  }

}
