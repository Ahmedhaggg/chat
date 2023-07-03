import { Router } from "express";
import userAuthController from "./controllers/auth.controller";
import tokenController from "./controllers/token.controller";

const router = Router();

router.use("/v1/user/auth/", userAuthController);
router.use("/v1/user/auth/", tokenController);

export default router;