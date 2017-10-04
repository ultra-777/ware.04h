export interface Result<T> {
    succeeded: boolean;
    data?: T;
    errorMessage?: string;
}
