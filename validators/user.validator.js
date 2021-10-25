const Joi = require('joi');

const userRegisterSchema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
});

module.exports = {
    userRegister: userRegisterSchema,
};
