import { ConstraintInterface } from '../constraint.interface';

export class ErrorConfigurationOption implements ConstraintInterface {
  constructor(private readonly message: string) {}

  public getMessage(): string {
    return this.message;
  }

  //TODO add payload
  public getPayload(): any {
    return {};
  }
}
