import { NextFunction, Request, Response } from "express";
import groupRepository from "../repositories/group.repository";
import expressAsyncHandler from "express-async-handler";
import ApiError from "../../../shared/errors/ApiError";
import httpStatusCode from "../../../shared/errors/httpStatusCode";

export const isAdminGroup = expressAsyncHandler(async (req: Request, res: Response, next : NextFunction) => {
    let { id } = req.user as { id: string };

    let groupId = parseInt(req.params.id);

    let group = await groupRepository.findGroupMainAttributesById(groupId);

    if (group?.adminId == id)
        return next();
    else 
        throw new ApiError(httpStatusCode.CLIENT_ERROR, "this is available for admin")
})