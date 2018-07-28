import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-categories',
  templateUrl: './item-categories.component.html',
  styleUrls: ['./item-categories.component.scss']
})
export class ItemCategoriesComponent {
  @Input() categories = [];

  constructor() { }

}
