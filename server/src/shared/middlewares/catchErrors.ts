import { RequestHandler, Request, Response, NextFunction } from "express";

export default (controller: RequestHandler) =>
    (req: Request, res: Response, next: NextFunction) => Promise
        .resolve(controller(req, res, next)).catch(next);