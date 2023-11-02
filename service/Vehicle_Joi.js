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

exports.VehicleAddJoi = (req) => {
    let schema = joi.object({
        brand: joi.string().messages(customMessage("brand")).required(),
        name: joi.string().messages(customMessage("name")).required(),
        price: joi.number().messages(customMessage("price")).required(),
        category: joi.string().messages(customMessage("category")).required(),
        year: joi.string().messages(customMessage("year")).required(),
        model: joi.string().messages(customMessage("model")).required(),
        type: joi.string().messages(customMessage("type")).required(),
        gearType: joi.string().messages(customMessage("gearType")).required(),
        mileage: joi.string().messages(customMessage("mileage")).required(),
        location: joi.string().messages(customMessage("location")).required(),
        locationInMap: joi.string().messages(customMessage("locationInMap")).required(),
        engineType: joi.string().messages(customMessage("engineType")).required(),
        noOfCylinders: joi.string().messages(customMessage("noOfCylinders")).required(),
        Displacement: joi.number().messages(customMessage("Displacement")).required(),
        MaxPower: joi.string(),
        MaxTorque: joi.string(),
        FrontBrake: joi.string(),
        RearBrake: joi.string(),
        stock: joi.number(),
        FuelCapacity: joi.number().messages(customMessage("FuelCapacity")).required(),
        ABS: joi.string(),
        Speedometer: joi.string().messages(customMessage("Speedometer")).required()
    })

    let { error } = schema.validate(req, { abortEarly: false })
    return error ? error : false
}
//                                  @Booking JOI 
exports.BookVehicle_joi = (req) => {
    let schema = joi.object({
        Date: joi.string().messages(customMessage("Date")).required(),
        bookTime: joi.string().messages(customMessage("bookTime")).required(),
        returnTime: joi.string().messages(customMessage("returnTime")).required(),
        // price: joi.number().messages(customMessage("price")).required()
    })
    let { error } = schema.validate(req, { abortEarly: false })

    return error ? error : false
}

exports.CheckID = (req) => {
    let schema = joi.object({
        id: joi.string().messages(customMessage("id")).required(),
    })
    let { error } = schema.validate(req, { abortEarly: false })

    return error ? error : false
}

exports.StatusJoi = (req) => {
    let schema = joi.object({
        status: joi.string().min(1).messages(customMessage("status")).required(),
    })
    let { error } = schema.validate(req, { abortEarly: false })

    return error ? error : false
}

exports.VehicleSearch = (req) => {
    let schema = joi.object({
        code: joi.string().messages(customMessage("code")),
        VehicleNumber: joi.string().messages(customMessage("VehicleNumber")),
        page: joi.number().messages(customMessage("page")),
        search: joi.string().messages(customMessage("search")),
        category: joi.string().messages(customMessage("category")),
        mileage: joi.array().messages(customMessage("mileage")),
        price: joi.array().messages(customMessage("price")),
        Date: joi.string().allow('').messages(customMessage('Date'))
    })
    let { error } = schema.validate(req, { abortEarly: false })

    return error ? error : false
}

exports.GetVehicleJoi = (req) => {
    let schema = joi.object({
        page: joi.number().messages(customMessage("page")),
        location: joi.string().allow('').messages(customMessage("location")),
        brand: joi.string().allow('').messages(customMessage("brand")),
        search: joi.string().allow('').messages(customMessage("search")),
        category: joi.string().allow('').messages(customMessage("category")),
        mileage: joi.array().allow('').messages(customMessage("mileage")),
        price: joi.string().allow('').messages(customMessage("price")),
    })
    let { error } = schema.validate(req, { abortEarly: false })
    return error ? error : false
}
