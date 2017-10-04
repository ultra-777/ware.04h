import { Component, ViewEncapsulation } from "@angular/core";
import {ResultService, Status} from "./result.service";

@Component({
  selector: 'result',
  templateUrl: './result.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./result.component.scss'],
  host: {
    'class': 'result-component'
  }
})
export class ResultComponent {

  message: string;

  constructor(private _resultService: ResultService) {
  }

  ngOnDestroy() {
  }

  ngOnInit() {
    switch(this._resultService.status) {
      case Status.succeeded:
        this.message = 'Счет успешно оплачен';
        break;
      case Status.cancelled:
        this.message = 'Счет успешно отменен';
        break;
    }
  }
}
