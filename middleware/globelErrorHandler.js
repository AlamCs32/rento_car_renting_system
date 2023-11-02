const CustomError = require("../service/CustomError")
require('dotenv').config()
const { DebugMod } = process.env
const { ValidationError } = require('joi')
const sequelize = require('../config/dbConfig')

let errorHandler = async (error, req, res, next) => {

    let error_message = {
        success: false,
        code: 500,
        message: "internal server error",
        ...(DebugMod === "true" && { originalError: error.message })
    }
    // Joi Error
    if (error instanceof ValidationError) {
        error_message.code = 403
        error_message.message = error.details.map(i => (i.message))
    }
    // Sequelize Error
    if (error instanceof sequelize.ValidationError) {
        error_message.code = 401 // validation Error code
        error_message.message = error.errors.map(err => (err.message))
    }
    // Custom Error
    if (error instanceof CustomError) {
        error_message.code = error.status
        error_message.message = error.message
    }

    return res.status(error_message.code).send({ error: error_message })
}
module.exports = errorHandler