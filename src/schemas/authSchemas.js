import Joi from "joi";

export const registerSchema = Joi.object({
    name:Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(30).required(),
});
export const loginSchema = Joi.object({
    email:Joi.string().email().required(),
    password: Joi.string().min(4).max(50).required(),
});
export const requestResetEmailSchema = Joi.object({
    email:Joi.string().email().required(),
});