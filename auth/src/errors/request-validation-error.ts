import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
    constructor(public errors: ValidationError[]){
        super('Invalid request');

        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }
}