const { Vehicle, Specification, VehicleBooking } = require('../models')
const { QueryTypes } = require('sequelize')
const { VehicleImage, vehicleFileDelete, ImageFileDelete } = require('../config/multer')
const { VehicleAddJoi, BookVehicle_joi, CheckID, VehicleSearch, GetVehicleJoi } = require('../service/Vehicle_Joi')
const catchAsyncError = require('../middleware/catchAsyncError')
const { sequelize, Op } = require('../config/dbConfig')
const { No_Item, InvalidTime } = require('../service/CustomError')
require('dotenv').config({ path: 'server/config/config.env' })
const moment = require('moment')

exports.EjsAddVehicle = (req, res) => {

    const response = {
        success: req.flash("success"),
        Error: req.flash("Error"),
        message: req.flash("message")
    }

    return res.render("admin/AddCar", { response })
}


exports.AddVahicle = async (req, res, next) => {
    let image = await VehicleImage(req, res, 'vehicle').catch(error => {
        return console.log("AddVehicle Line No 18 ", { error })
    })

    let valid = VehicleAddJoi(req.body)
    if (valid) { return next(valid) }

    Object.keys(req.body).forEach(k => req.body[k] = req.body[k].trim())

    let t = await sequelize.transaction({ autocommit: true })

    req.body.owner = req.user.id
    req.body.image = image.map(i => (i.filename))

    let vehicle = await Vehicle.create(req.body, { transaction: t })

    req.body.bikeId = vehicle.id

    await Specification.create(req.body, { transaction: t })
    await t.commit()

    req.flash("success", "Car is Added")
    return res.redirect('/admin/search')
}

exports.EjsAddVehicleUpdatePage = async (req, res) => {

    let vehicle = await Vehicle.findOne({
        where: {
            id: req.params.id
        }, raw: true
    })
    let booking = await Specification.findOne({
        where: {
            bikeId: vehicle.id
        }, raw: true
    })

    let response = {
        Error: req.flash("Error"),
        message: req.flash("message"),
    }
    console.log(booking, vehicle)
    return res.render("admin/UpdateCar", { response, vehicle, booking, token: req.cookies.token })
}

exports.VehicleUpdate = catchAsyncError(async (req, res, next) => {
    let image = await VehicleImage(req, res)

    let vehicle = await Vehicle.findOne({ where: { id: req.params.id } })
    let t = await sequelize.transaction()

    // Joi Validation
    let valid = VehicleAddJoi(req.body)
    if (valid) {
        if (image) {
            ImageFileDelete(image)
        }
        return next(valid)
    }

    if (image) {
        vehicle.image.replace(/"/g, '')
        vehicle.image = JSON.parse(vehicle.image)
        vehicleFileDelete(vehicle.image) //Deleting Current Image File
        req.body.image = image.map(i => (i.filename))
    }
    // console.log(req.body)
    req.body.updatedBy = req.user.id

    let vehicleUpdate = await Vehicle.update(req.body, { where: { id: vehicle.id }, transaction: t })
    let specification = await Specification.update(req.body, { where: { bikeId: vehicle.id } })

    await t.commit()
    return res.status(200).json({
        success: true,
        vehicle: vehicleUpdate,
        specification
    })
})

exports.VehicleDelete = async (req, res, next) => {

    let t = await sequelize.transaction()

    let vehicle = await Specification.findOne({ where: { bikeId: req.params.id }, raw: false, include: { model: Vehicle }, transaction: t })

    if (!vehicle || !vehicle.Vehicle) {
        return next(No_Item(`Data is deleted ${req.params.id}`))
    }

    vehicle.Vehicle.image.replace(/"/g, '')
    vehicle.Vehicle.image = JSON.parse(vehicle.Vehicle.image)
    vehicleFileDelete(vehicle.Vehicle.image)
    // Record Deleting from Data Base
    await Vehicle.destroy({ where: { id: vehicle.Vehicle.id }, transaction: t })
    await Specification.destroy({ where: { bikeId: vehicle.Vehicle.id }, transaction: t })

    await t.commit()

    req.flash("success", "Car is Deleted")
    return res.redirect('/admin/search')
}
// Home Page EJS
exports.HomePage = catchAsyncError(async (req, res) => {
    let vehicle = await Vehicle.findAll({ limit: 10, raw: true })
    if (vehicle) {
        for (let i in vehicle) {
            vehicle[i].image.replace(/"/g, '')
            vehicle[i].image = JSON.parse(vehicle[i].image)
            vehicle[i].image = vehicle[i].image[0]
        }
    }
    return res.render("index", { vehicle, token: req.cookies.token, admin: req.Admin })
})

exports.GetVehicle = async (req, res, next) => {

    let valid = GetVehicleJoi(req.query)
    if (valid) return next(valid);

    let search = {
        raw: true,
        limit: 10,
        offset: req.query.page ? (req.query.page - 1) * 10 : 0
    }

    req.query.search ? search.where = {
        [Op.or]: [
            { name: { [Op.like]: `%${req.query.search}%`, } },
            { brand: { [Op.like]: `%${req.query.search}%`, } }
        ]
    } : "";
    req.query.brand ? search.where = { brand: { [Op.like]: `%${req.query.brand}%`, } } : "";
    req.query.category ? search.where = { category: { [Op.like]: `%${req.query.category}%` } } : "";
    req.query.location ? search.where = { location: { [Op.like]: `%${req.query.location}%` } } : "";
    req.query.price ? search.where = {
        price: {
            [Op.lte]: req.query.price
        }
    } : "";

    let vehicle = await Vehicle.findAll(search)
    if (vehicle) {
        for (let i in vehicle) {
            vehicle[i].image.replace(/"/g, '')
            vehicle[i].image = JSON.parse(vehicle[i].image)
            vehicle[i].image = vehicle[i].image[0]
        }
    }
    return res.render("Search", { vehicle, token: req.cookies.token, admin: req.Admin })
}

exports.GetVehicleDetails = catchAsyncError(async (req, res) => {

    let vehicle = await Specification.findOne({ where: { bikeId: req.params.id }, attributes: { exclude: ['createdAt', 'updatedAt', 'bikeId'] }, raw: false, include: { model: Vehicle, attributes: { exclude: ['createdAt', 'updatedAt', 'owner'] } } })

    if (vehicle.Vehicle.image) {
        vehicle.Vehicle.image.replace(/"/g, '')
        vehicle.Vehicle.image = JSON.parse(vehicle.Vehicle.image)
    }

    return res.render("VehicleDetails", { vehicle, token: req.cookies.token, admin: req.Admin })

})

//                  @Booking Vehicle 
// Ejs Page
exports.PageBooking = async (req, res) => {
    let vehicle = await Vehicle.findOne({
        where: {
            id: req.params.id
        }
    })
    return res.render('BookingVehicle', { vehicle })
}

exports.EjsBookedListPage = async (req, res) => {

    const offset = req.query.page ? (req.query.page - 1) * 10 : 0

    const vehicleBooking = await sequelize.query(`SELECT * FROM vehicle LEFT JOIN vahiclebooking ON vehicle.id = vahiclebooking.vehicleId WHERE vahiclebooking.userId=${JSON.stringify(req.user.id)} LIMIT 10 OFFSET ${offset}`, { type: QueryTypes.SELECT })

    for (let i of vehicleBooking) {
        i.image.replace(/"/g, '')
        i.image = JSON.parse(i.image)
    }

    return res.render('BookedList', { token: req.cookies.token, admin: req.Admin, vehicleBooking })
}

exports.BookingVehicleDetails = async (req, res, next) => {

    let valid = CheckID(req.params)
    if (valid) return next(valid);

    let vehicleBook = await VehicleBooking.findOne({
        where: {
            id: req.params.id
        }, raw: true
    })

    if (!vehicleBook) {
        return res.status(200).json({
            success: false,
            message: "No Vehicle Booked "
        })
    }

    let vehicle = await Vehicle.findOne({
        where: {
            id: vehicleBook.vehicleId
        }, raw: true
    })

    let data = {
        vehicle, vehicleBook
    }

    let response = {
        message: req.flash("message"),
        Error: req.flash("Error"),
    }

    return res.render("BookedDetails", { data, response, token: req.cookies.token, admin: req.Admin })
}


exports.BookVehicle = async (req, res, next) => {
    let valid = BookVehicle_joi(req.body)
    if (valid) return next(valid);

    let t = await sequelize.transaction()

    let vehicle = await Vehicle.findOne({
        where: {
            id: req.params.id,
            available: true
        }
    })

    if (!vehicle) {
        return res.status(200).json({
            success: false,
            message: "Vehicle is Booked"
        })
    }

    let vehicleBook = await VehicleBooking.findOne({
        where: {
            vehicleId: req.params.id,
            status: "booked",
            Date: req.body.Date
        }, raw: true
    })
    if (vehicleBook) {
        return res.status(200).json({
            success: false,
            message: "Vehicle is Booked on This Date"
        })
    }

    let bookTime = moment(req.body.bookTime, "HH:mm")
    let returnTime = moment(req.body.returnTime, "HH:mm")

    let TimeCheck = bookTime.isBefore(returnTime)
    if (!TimeCheck) { return next(InvalidTime()) }
    // Adding Data info req.body 
    req.body.userId = req.user.id
    req.body.vehicleId = vehicle.id
    req.body.totalMinute = returnTime.diff(bookTime, 'minutes')
    req.body.totalHours = moment.utc(returnTime.diff(bookTime)).format("h:mm")
    req.body.price = vehicle.price
    req.body.totalAmmount = ((vehicle.price / 60) * req.body.totalMinute)

    let result = await VehicleBooking.create(req.body, { transaction: t })
    await Vehicle.update({ available: false }, {
        where: {
            id: req.params.id
        }, transaction: t
    })
    await t.commit()

    req.flash("success", "car is Booked")
    return res.redirect(`/booking/${result.id}`)
}
// @User
// Vehicle Booking Cancle 
exports.BookingCancle = async (req, res, next) => {

    let vehicleBook = await VehicleBooking.findOne({
        where: {
            id: req.params.id,
            status: 'booked'
        }, raw: true
    })

    if (!vehicleBook) {
        req.flash("message", "Vehicle is Booked or Cancle")
        return res.redirect(`/booking/${req.params.id}`)
    }

    let t = await sequelize.transaction()

    await VehicleBooking.update({
        status: 'cancle'
    }, {
        where: {
            id: vehicleBook.id
        }, transaction: t
    })

    await Vehicle.update({ available: true }, {
        where: {
            id: vehicleBook.vehicleId
        }, transaction: t
    })
    await t.commit()

    req.flash("success", "car is Booked")
    return res.redirect(`/booking/${req.params.id}`)
}

// @admin
exports.BookApprove = catchAsyncError(async (req, res, next) => {

    let valid = CheckID(req.params)
    if (valid) return next(valid);

    let status = ['booked', 'cancle', 'return']
    if (!status.includes(req.body.status)) {
        req.flash("message", "Status should be booked,cancle or return")
        return res.redirect('/dashboard')
    }

    let vehicle = await VehicleBooking.findOne({
        where: {
            id: req.params.id
        }
    })

    if (vehicle.status == 'return' || vehicle.status == 'cancle') {
        req.flash("message", `Car is Already ${vehicle.status}`)
        return res.redirect('/dashboard')
    }

    if (req.body.status === 'return') {
        let time = moment(moment().format("HH:mm"), "HH:mm")
        let returnTimes = moment(vehicle.returnTime, "HH:mm")
        if (returnTimes.isBefore(time)) {
            req.body.totalMinute = time.diff(returnTimes, 'minutes')
            req.body.totalHours = moment.utc(time.diff(returnTimes)).format("HH:mm")
            req.body.totalAmmount = ((vehicle.price / 60) * req.body.totalMinute) + vehicle.totalAmmount
            req.body.ActualReturnTime = moment().format("YYYY-MM-DDTHH:mm:ss")
        }
        req.body.ActualReturnTime = moment().format("YYYY-MM-DDTHH:mm:ss")
    }

    let t = await sequelize.transaction()

    let result = await VehicleBooking.update(req.body, {
        where: {
            id: req.params.id
        }, transaction: t
    })
    await Vehicle.update({ available: true }, {
        where: {
            id: vehicle.vehicleId
        }, transaction: t
    })
    await t.commit()
    req.flash("success", `Car Booked is ${vehicle.status}`)
    return res.redirect(`/payment/${vehicle.id}`)
})

// @Admin
exports.SearchBooking = catchAsyncError(async (req, res, next) => {
    let valid = VehicleSearch(req.query)
    if (valid) return next(valid);

    let search = {
        raw: true,
        limit: 10,
        offset: req.query.page ? (req.query.page - 1) * 10 : 0
    }
    req.query.code ? search.where = { code: req.query.code } : ""
    req.query.Date ? search.where = { Date: req.query.Date } : ""
    req.query.returnDate ? search.where = { returnDate: req.query.returnDate } : ""

    let vehicle = await VehicleBooking.findAll(search)

    return res.status(200).json({
        success: true,
        vehicle
    })
})

// @admin Search All Vehicle 
exports.AdminSearchVehicle = catchAsyncError(async (req, res, next) => {

    let valid = GetVehicleJoi(req.query)
    if (valid) return next(valid)

    let search = {
        raw: true,
        limit: 10,
        offset: req.query.page ? (req.query.page - 1) * 10 : 0
    }

    req.query.vehicle ? search.where = {
        [Op.or]: [
            { name: { [Op.like]: `%${req.query.vehicle}%`, } },
            { brand: { [Op.like]: `%${req.query.vehicle}%`, } },
            { VehicleNumber: { [Op.like]: `%${req.query.vehicle}%` } }
        ]
    } : "";

    req.query.category ? search.where = { category: { [Op.like]: `%${req.query.category}%` } } : "";
    req.query.mileage ? search.where = { mileage: { [Op.between]: req.query.mileage } } : "";
    req.query.price ? search.where = {
        price: {
            [Op.lte]: req.query.price
        }
    } : "";

    let vehicle = await Vehicle.findAll(search)

    if (vehicle) {
        for (let i in vehicle) {
            vehicle[i].image.replace(/"/g, '')
            vehicle[i].image = JSON.parse(vehicle[i].image)
            vehicle[i].image = vehicle[i].image[0]
        }
    }
    return res.render("admin/adminSearch", { vehicle, token: req.cookies.token, admin: req.Admin })
})

// @admin Search Booking Details
exports.AdminBookingSearchDetails = catchAsyncError(async (req, res, next) => {


    const vehicleBooking = await sequelize.query(`SELECT * FROM vehicle LEFT JOIN vahiclebooking ON vehicle.id = vahiclebooking.vehicleId WHERE vahiclebooking.id=${JSON.stringify(req.params.id)} LIMIT 1`, { type: QueryTypes.SELECT })

    for (let i of vehicleBooking) {
        i.image.replace(/"/g, '')
        i.image = JSON.parse(i.image)
    }

    let vehicle = await VehicleBooking.findOne({
        where: {
            id: req.params.id
        }
    })
    return res.render('BookedList', { token: req.cookies.token, admin: req.Admin, vehicleBooking })
    if (!vehicle) {
        return res.status(200).json({
            success: false,
            message: "No Booking Found"
        })
    }

    return res.status(200).json({
        success: true,
        vehicle
    })
})
