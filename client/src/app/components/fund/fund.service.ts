import {Observable} from "rxjs/Observable";

export class Snapshot {
    constructor(
        public balance: number,
        public invoice: number
    ){

    }

    get canPay(): boolean {
        return this.balance >= this.invoice;
    }
}

export class FundService {
    getSnapshot(): Observable<Snapshot> { return undefined; }
    pay() { }
    cancel() { }
}
