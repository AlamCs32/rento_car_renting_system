const joi = require('joi')

// For Custom Error Message is Joi
function customMessage(fieldName) {
    return {
        'string.base': `${fieldName} should be a type of 'text'`,
        'string.empty': `${fieldName} cannot be an empty field`,
        'string.min': `${fieldName} should have a minimum length of 5`,
        'any.required': `${fieldName} is a required field`
    }
}



exports.user_singup_joi = (req) => {
    let schema = joi.object({
        username: joi.string().min(1).messages(customMessage('username')).required(),
        email: joi.string().email().min(1).messages(customMessage("email")).required(),
        password: joi.string().min(1).messages(customMessage("password")).required(),
        phone: joi.number().min(1).messages(customMessage("phone")).required(),
        city: joi.string().min(1).messages(customMessage("city")).required(),
        state: joi.string().min(1).messages(customMessage("state")).required(),
        address: joi.string().min(1).messages(customMessage("address")).required(),
    })
    let { error } = schema.validate(req, { abortEarly: false })

    return error ? error : false
}

exports.login_joi = (req) => {
    let schema = joi.object({
        email: joi.string().email().min(1).messages(customMessage("Email")).required(),
        password: joi.string().min(1).messages(customMessage("Password")).required(),
    })
    let { error } = schema.validate(req, { abortEarly: false })

    return error ? error : false
}

exports.changePwd_joi = (req) => {
    let schema = joi.object({
        password: joi.string().min(1).messages(customMessage("password")).required(),
        confirm_password: joi.string().messages(customMessage("confirm password")).min(1).required(),
        oldPassword: joi.string().messages(customMessage("Old Password")).min(1).required(),
    })
    let { error } = schema.validate(req, { abortEarly: false })

    return error ? error : false
}

exports.ForgetchangePwd_joi = (req) => {
    let schema = joi.object({
        password: joi.string().min(1).messages(customMessage("password")).required(),
        confirm_password: joi.string().messages(customMessage("confirm password")).min(1).required(),
    })
    let { error } = schema.validate(req, { abortEarly: false })

    return error ? error : false
}

exports.SendEmail_joi = (req) => {

    let Schema = joi.object({
        email: joi.string().email().min(1).messages(customMessage("email")).required()
    })
    let { error } = Schema.validate(req, { abortEarly: false })
    console.log(error)
    return error ? error : false;
}

exports.UpdateProfileJoi = joi.object({
    username: joi.string().min(1).messages(customMessage('username')),
    city: joi.string().min(1).messages(customMessage("city")),
    state: joi.string().min(1).messages(customMessage("state")),
    address: joi.string().min(1).messages(customMessage("address")),
}).options({ abortEarly: false })