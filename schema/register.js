const Joi = require('@hapi/joi');

const registerSchema = {
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    isProfessor:Joi.string().required(),
    password: Joi.string().required(),
    passwordConfirm: Joi.ref('password')
};

module.exports = {
    registerSchema
};