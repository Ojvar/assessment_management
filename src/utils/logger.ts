export default class Logger {
  static error(message: string, error?: unknown): void {
    if (error instanceof Error) {
      console.error(`[ERROR] ${message}: ${error.message}\n${error.stack}`);
    } else if (error !== undefined) {
      console.error(`[ERROR] ${message}: ${JSON.stringify(error)}`);
    } else {
      console.error(`[ERROR] ${message}`);
    }
  }

  static info(message: string): void {
    console.log(`[INFO] ${message}`);
  }

  static warn(message: string): void {
    console.warn(`[WARN] ${message}`);
  }

  static debug(message: string, data?: unknown): void {
    if (data !== undefined) {
      console.debug(`[DEBUG] ${message}: ${JSON.stringify(data)}`);
    } else {
      console.debug(`[DEBUG] ${message}`);
    }
  }
}
