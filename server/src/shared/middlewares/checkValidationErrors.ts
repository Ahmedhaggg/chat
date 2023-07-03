import { NextFunction, Request, Response } from "express";

import { validationResult } from "express-validator"
import ApiError from "../errors/ApiError";
import status from "../errors/httpStatusCode";

export default (req: Request, res: Response, next: NextFunction) => {
    let result = validationResult(req).array();

    if (result.length == 0)
        return next();

    let errors: any = {};
    result.forEach(error => { errors[error.param] = error.msg });

    let newError = new ApiError(status.CLIENT_ERROR, {
        success: false,
        errors
    });

    next(newError);
}