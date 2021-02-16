import { ConfigurationNotDefinedException } from '@app/exceptions/configuration/configuration.not.defined.exception';
import { ConstraintInterface } from '../validation/constraint.interface';
import { ErrorConfigurationOption } from '@app/validation/configuration/error.configuration.option';

export class ConfigurationValidator {
  public static validate(configuration: any): ConstraintInterface[] {
    const violationList: ConstraintInterface[] = [];

    if (!configuration) {
      throw ConfigurationNotDefinedException.notDefined();
    }

    if (!configuration.rects.items || !Array.isArray(configuration.rects.items)) {
      violationList.push(new ErrorConfigurationOption('rects must be are array'));
    }

    configuration.rects.items.forEach((el: any, i: number): void => {
      if (typeof el !== 'object' || !this.propertiesValidation([el.x, el.y, el.width, el.height])) {
        violationList.push(
          new ErrorConfigurationOption(
            `rect[${i}] must be has fields: {x: number, y:number, width: number, height: number}`
          )
        );
      }
    });

    return violationList;
  }

  private static propertiesValidation(properties: any[]): boolean {
    for (const prop of properties) {
      if (!Number.isInteger(prop)) {
        return false;
      }
    }

    return true;
  }
}
