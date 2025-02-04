import { validateBody } from "../middlewares/validateBody.js";
import { Router } from "express";
import { registerUserController, loginUserController } from "../controllers/authController.js";
import {registerSchema, loginSchema} from "../schemas/authSchemas.js"

const authRouter = Router();

authRouter.post('/register', validateBody(registerSchema), registerUserController);
authRouter.post('/login', validateBody(loginSchema), loginUserController);
export default authRouter