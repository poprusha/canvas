export interface ConstraintInterface {
  getMessage(): string;
  getPayload<T>(): T;
}
