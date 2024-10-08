

export class DatabaseConnectionError extends Error{

    reason = "error Connecting to the Database!";

    constructor(){
        super();

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    } 
}