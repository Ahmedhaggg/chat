import { Router, Request, Response } from "express";
import passport from "passport"
import { loginWithGoogle } from "../services/auth.service"
import httpStatucCode from "../../../shared/errors/httpStatusCode";
import { formatResponse } from "../../../shared/helpers/responseFormat";
import IPassportUser from "../interfaces/IPassportUser";
import catchErrors from "../../../shared/middlewares/catchErrors";
const router = Router();


router
    .get("/google", 
        passport.authenticate("google", { scope: ["profile", "email"] })
    )

router
  .get('/google/callback',
    passport.authenticate("google", {
      failureRedirect: "/api/v1/user/auth/google/callback/faild",
      session:false
    }),
    catchErrors(
      async (req: Request, res: Response) => {
        let { emails, photos, displayName } = req.user as IPassportUser;

        let { accessToken, refreshToken } = await loginWithGoogle({ 
          name: displayName, 
          photo: photos[0].value,
          email: emails[0].value
        });

        return res.status(httpStatucCode.OK).json(formatResponse({ accessToken, refreshToken }))

      }
    )
  );

router.get("/google/callback/faild", function(req, res, next) {
  res.json({ message: "faild login", success: true })
})

export default router;