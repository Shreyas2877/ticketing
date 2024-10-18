import { ValidationError } from "express-validator";
import { CustomError } from "./custom-errors";

export class RequestValidationError extends CustomError {

    statusCode = 400

    constructor(public errors: ValidationError[]) {
        super("Something went wrong!");

        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors() {
        return this.errors.map(error => {
            if(error.type === 'field'){
                return { message: error.msg, field: error.path };
            }
            return { message: error.msg };
        })
    }
}