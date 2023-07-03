import { Router, Request, Response, NextFunction } from "express";
import { guard } from "../../../shared/middlewares/guards";
import { createGroup, findGroupsByQuery, findUserGroup, updateGroupData, updateGroupImage } from "../services/group.service";
import ISearchGroupsQuery from "../interfaces/ISearchGroupsQuery";
import httpStatusCode from "../../../shared/errors/httpStatusCode";
import { formatResponse } from "../../../shared/helpers/responseFormat";
import { validateCreateGroup, validateUpdateGroup } from "../validations/group.validation";
import checkValidationErrors from "../../../shared/middlewares/checkValidationErrors";
import expressAsyncHandler from "express-async-handler";
import { isAdminGroup } from "../middlewares/isAdminGroup.middleware";
import { saveInMemory } from "../../../shared/middlewares/uploader";
import ApiError from "../../../shared/errors/ApiError";

const groupRouter = Router();

groupRouter
    .route("/")
    .get(
        guard("user"),
        expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            let { name, categoryId } = req.query as unknown as ISearchGroupsQuery;
            
            let groups = await findGroupsByQuery({ name, categoryId })

            res.status(httpStatusCode.OK).json(formatResponse({ groups }));
        })
    )
    .post(
        guard("user"),
        validateCreateGroup(),
        checkValidationErrors,
        expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            let { name, categoryId, privacy, status } = req.body;

            let { filename } = req.file as Express.Multer.File;
            
            let { id: adminId } = req.user as { id: string };

            let newGroup = await createGroup({ name, categoryId, privacy, status, image: filename, adminId });

            res.status(httpStatusCode.OK).json(formatResponse({ newGroup }))
        })
    );

groupRouter
    .route(":id")
    .get(
        guard("user"),
        expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            let { id: userId} = req.user as { id: string };
            let groupId = parseInt(req.params.id);

            let group = await findUserGroup(userId, groupId);

            res.status(httpStatusCode.OK).json(formatResponse({ group }));
        })
    )
    .patch(
        guard("user"),
        isAdminGroup,
        validateUpdateGroup(),
        checkValidationErrors,
        expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            let groupId: number = parseInt(req.params.id);
            const { name, privacy, status} = req.body;
            
            await updateGroupData(groupId, { name, privacy, status });

            res.status(httpStatusCode.OK).json(formatResponse({}))
        })
    )

groupRouter
    .patch(":id/image",
        guard("user"),
        saveInMemory,
        isAdminGroup,
        expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            let groupId: number = parseInt(req.params.id);
            if (!req.file)
                throw new ApiError(httpStatusCode.CLIENT_ERROR, "you should select image")
            const newGroupImageBuffer = req.file.buffer;
            
            let newGroupImage = await updateGroupImage(groupId, newGroupImageBuffer)

            res.status(httpStatusCode.OK).json(formatResponse({ newGroupImage }));
        })
    )

export default groupRouter;
