export class ConfigurationNotDefinedException extends Error {
  protected constructor(message: string) {
    super(message);
  }

  public static notDefined(): ConfigurationNotDefinedException {
    return new ConfigurationNotDefinedException('configuration not defined, but windows.APP_MODE is `true`');
  }
}
