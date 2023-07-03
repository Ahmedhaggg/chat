import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError";
import status from "../errors/httpStatusCode";
import { getDataFromJwtToken } from "../helpers/jwt";
const catchErrors = require("./catchErrors");

export const guard = (...roles: string[]) => catchErrors(
    async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers['authorization'];
        if (!token) 
            throw new ApiError(status.UNAUTHORIZED, {
                message: "you should login"
            });


        let tokenData : {[key: string]: any, role: string } = await getDataFromJwtToken(token);

        if (!roles.includes(tokenData.role)) 
            throw new ApiError(status.UNAUTHORIZED, {
                message: "you should login"
            });

        (req as any)[tokenData.role] = tokenData;

        next();
    } catch (err) {
        throw new ApiError(
            status.UNAUTHORIZED, 
            { message: "you should login"}
        )
    }   
})
