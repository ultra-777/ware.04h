import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./root.component.scss'],
  host: {
    'class': 'root'
  }
})
export class RootComponent {

  constructor() {
  }

  ngOnDestroy() {
  }
}
