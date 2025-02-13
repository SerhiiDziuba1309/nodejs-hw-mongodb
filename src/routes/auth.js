import { validateBody, } from "../middlewares/validateBody.js";
import {ctrlWrapper} from "../utils/ctrlWrapper.js"
import { Router } from "express";
import { 
    registerUserController,
    loginUserController, 
    refreshSessionController,
    logoutUserController,
    requestResetEmailController,
    resetPasswordController
} from "../controllers/authController.js";
import {registerSchema, loginSchema, requestResetEmailSchema, resetPasswordSchema} from "../schemas/authSchemas.js"

const authRouter = Router();

authRouter.post('/register', validateBody(registerSchema), registerUserController);
authRouter.post('/login', validateBody(loginSchema), loginUserController);
authRouter.post('/refresh', refreshSessionController);
authRouter.post('/logout', logoutUserController);

authRouter.post('/request-reset-email', 
validateBody(requestResetEmailSchema),
ctrlWrapper(requestResetEmailController));

authRouter.post(
    '/reset-password',
    validateBody(resetPasswordSchema),
    ctrlWrapper(resetPasswordController),
)

export default authRouter