import { Router, Request, Response, NextFunction } from "express";
import { refreshAccessToken, logout } from "../services/token.service"
import httpStatucCode from "../../../shared/errors/httpStatusCode";
import { formatResponse } from "../../../shared/helpers/responseFormat";
import catchErrors from "../../../shared/middlewares/catchErrors";
import { validateRefreshToken, validateLogout } from "../validators/token.validator";
import checkValidationErrors from "../../../shared/middlewares/checkValidationErrors";
const router = Router();

router
    .post("/refresh", 
        validateRefreshToken(),
        checkValidationErrors,
        catchErrors(
            async (req: Request, res: Response, next: NextFunction) => {
                let { refreshToken } = req.body;

                let  accessToken = await refreshAccessToken(refreshToken);

                res.status(httpStatucCode.OK).json(formatResponse({ accessToken }))
            }
        )
    )

router
    .delete("/logout", 
        validateLogout(),
        checkValidationErrors,
        catchErrors(
            async (req: Request, res: Response, next: NextFunction) => {
                let { refreshToken } = req.body;

                await logout(refreshToken);

                res.status(httpStatucCode.OK).json(formatResponse(null))
            }
        )
    )

export default router;