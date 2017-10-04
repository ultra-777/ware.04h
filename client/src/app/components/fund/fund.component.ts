import { Component, ViewEncapsulation } from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {FundService, Snapshot} from "./fund.service";

@Component({
  selector: 'fund',
  templateUrl: './fund.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./fund.component.scss'],
  host: {
    'class': 'fund-component'
  }
})
export class FundComponent {

  form: FormGroup;

  snapshot: Snapshot;

  constructor(
      private fb: FormBuilder,
      private _fundService: FundService
  ) {
  }

  ngOnDestroy() {
  }

  ngOnInit() {
    this.form = this.fb.group({
    });

    const self = this;
    this
      ._fundService
      .getSnapshot()
      .subscribe(snapshot => {
        self.snapshot = snapshot;
      });
  }

  pay(event: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this._fundService.pay();
  }

  cancel(event: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this._fundService.cancel();
  }
}
