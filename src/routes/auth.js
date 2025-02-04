import { validateBody } from "../middlewares/validateBody.js";
import { Router } from "express";
import { registerUserController } from "../controllers/authController.js";
import {registerSchema} from "../schemas/authSchemas.js"

const authRouter = Router();

authRouter.post('/register', validateBody(registerSchema), registerUserController);

export default authRouter