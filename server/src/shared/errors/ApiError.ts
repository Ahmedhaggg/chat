import BaseError from "./BaseError";

export default class ApiError extends BaseError {
    constructor(httpStatusCode: number, description: any) {
        super(httpStatusCode, description)
    }
}