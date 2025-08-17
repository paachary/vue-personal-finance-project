export class CustomError extends Error {
    constructor(message, statusCode) {
        super(message); // Call the parent Error constructor
        this.name = this.constructor.name; // Set the name of the error to the class name
        this.statusCode = statusCode; // Add the custom statusCode property
    }
}
