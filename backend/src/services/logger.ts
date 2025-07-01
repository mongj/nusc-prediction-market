import chalk from "chalk";

export class Logger {
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  public debug(message: string, ...args: any[]): void {
    console.log(`${chalk.dim(this.getTimestamp())} ${chalk.dim("[DEBUG]")} ${chalk.dim(message)}`, ...args);
  }

  public info(message: string, ...args: any[]): void {
    console.log(`${this.getTimestamp()} [INFO] ${chalk.white(message)}`, ...args);
  }

  public warn(message: string, ...args: any[]): void {
    console.log(`${this.getTimestamp()} [WARN] ${chalk.yellow(message)}`, ...args);
  }

  public error(message: string, error?: Error): void {
    console.error(`${this.getTimestamp()} [ERROR] ${chalk.red(message + (error && `: ${error.message}`))}`);
  }

  public fatal(message: string, error?: Error): void {
    console.error(`${this.getTimestamp()} [FATAL] ${chalk.red.bold(message + (error && `: ${error.message}`))}`);
  }

  public success(message: string): void {
    console.log(`${this.getTimestamp()} [INFO] ${chalk.green(message)}`);
  }
}

export default new Logger();
