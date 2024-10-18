import { CustomError } from "./custom-errors";

export class UserExistsError extends CustomError {
  statusCode = 400;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, UserExistsError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
