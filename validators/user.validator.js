const joi = require('joi');

const userRegisterSchema = joi.object({
    username: joi.string().min(6).required(),
    password: joi.string().min(6).required(),
    email: joi.string().email().required(),
});

const userLoginSchema = joi.object({
    username: joi.string().min(6).required(),
    password: joi.string().min(6).required(),
});

module.exports = {
    userRegister: userRegisterSchema,
    userLogin: userLoginSchema,
};
