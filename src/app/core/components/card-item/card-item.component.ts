import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent {


  @Input()
  item: any;

  showDetails = false;

  getTheme(index: number): string {
    return index % 2 == 0 ? 'light' : 'dark';
   }

}
