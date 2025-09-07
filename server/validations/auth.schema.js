import Joi from 'joi';

export const registerUserSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

export const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const deleteUserSchema = Joi.object({
    email: Joi.string().email().required(),
});