import { ConstraintInterface } from '../constraint.interface';

export class ErrorConfigurationOption implements ConstraintInterface {
  constructor(private readonly message: string) {}

  public getMessage(): string {
    return this.message;
  }

  public getPayload(): any {
    return {};
  }
}
