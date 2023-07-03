export default class BaseError extends Error {
    httpStatusCode: number;
    description: any;
    constructor(httpStatusCode: number, description: any) {
        super(description);
        this.httpStatusCode = httpStatusCode;
        this.description = description;
    }
}
