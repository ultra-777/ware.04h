export enum Status {
    pending = 0,
    succeeded = 1,
    cancelled = 2
}

export class ResultService {
    get status(): Status { return undefined; }
}
