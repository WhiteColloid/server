//check data type
const require = ('@hapi/joi');


const registerSchema = {
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    passwordConfirm: Joi.ref('password')
};

module.export = {
    registerSchema
};


