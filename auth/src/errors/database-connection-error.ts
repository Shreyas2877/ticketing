import { CustomError } from "./custom-errors";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "error Connecting to the Database!";

  constructor() {
    super("error Connecting to the Database!");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
