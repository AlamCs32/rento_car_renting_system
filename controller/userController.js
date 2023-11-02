const { User, VehicleBooking } = require('../models')
const { userImage, ImageFileDelete, UpdateProfileImage, DeleteUpdateProfileImage } = require('../config/multer')
const { user_singup_joi, login_joi, changePwd_joi, SendEmail_joi, UpdateProfileJoi, ForgetchangePwd_joi } = require('../service/User_Joi')
const { UserExist, PasswordIncorrect } = require('../service/CustomError')
const { sing, verify } = require('../service/token_service')
const sendMail = require('../config/nodemailer')
const catchAsyncError = require('../middleware/catchAsyncError')
const { sequelize, QueryTypes, Op } = require('../config/dbConfig')
require('dotenv').config()
const { secretKey } = process.env

// Ejs Singup Page
exports.EjsSingupPage = (req, res) => {
    return res.render('singup')
}

exports.Singup = async (req, res, next) => {
    let image = await userImage(req, res).catch(error => {
        return next(error)
    })
    let allImage = image.user.concat(image.document)
    // Triming all Object value 
    Object.keys(req.body).forEach(k => req.body[k] = req.body[k].trim())
    // Joi Validation 
    let valid = user_singup_joi(req.body)
    if (valid) {
        if (image) { ImageFileDelete(allImage, 'user') }
        req.flash("message", "All Fields Are Required")
        return res.redirect('/singup')
    }
    let user = await User.findOne({ where: { email: req.body.email } }).catch(error => {
        // return next(error)
        req.flash("Error", "Something Went Wronge")
        return res.redirect('/singup')
    })
    if (user) {
        if (image) { ImageFileDelete(allImage, 'user') }
        req.flash("message", "user is present pls login")
        return res.redirect('/login')
    }

    req.body.userImage = image.user[0].filename
    req.body.documentImage = image.document.map(i => (i.filename))
    let result = await User.create(req.body).catch(error => {
        req.flash("Error", "Something Went Wronge")
        return res.redirect('/singup')
    })
    delete result.password
    let token = sing({ userId: result.id })
    return res.status(200).cookie('token', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true }).redirect('/')
}

// Ejs Login Page
exports.EjsLoginPage = (req, res) => {
    return res.status(200).render('login')
}

exports.Login = async (req, res, next) => {
    let valid = login_joi(req.body)
    if (valid) { return next(valid) }

    let user = await User.findOne({ where: { email: req.body.email } }).catch(error => {
        return next(error)
    })
    if (!user) { return next(UserExist("User Not present")) }
    let matchPassword = await User.ComparePassword(req.body.password, user.password)

    if (!matchPassword) {
        return res.status(401).json({
            success: false,
            message: "Invalid Email or Password"
        })
    }
    let token = sing({ userId: user.id })
    delete user.password

    return res.status(200).cookie('token', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true }).redirect('/')
}

exports.EjsChangePassword = (req, res) => {
    return res.status(200).render('ChangePassword')
}

exports.ChangePwd = async (req, res, next) => {
    // Joi Validation
    let valid = changePwd_joi(req.body)
    if (valid) { return next(valid) }

    let user = await User.findOne({ where: { id: req.user.id } }).catch(error => { return next(error) })

    let { confirm_password, password, oldPassword } = req.body

    let matchPassword = await User.ComparePassword(oldPassword, user.password)
    if (!matchPassword) {
        return res.status(304).send("PAssword id incorrect")
    }

    if (password !== confirm_password) {
        return next(PasswordIncorrect("Password not match"))
    }

    let result = await User.update({ password },
        {
            where: { id: user.id },
            individualHooks: true
        }).catch(error => { return next(error) })

    return res.status(200).send({ status: "success", result })
}
// Ejs Forget Password Email Send
exports.EjsSendLink = (req, res) => {
    let response = {
        message: req.flash('message'),
        field: req.flash('field'),
        Error: req.flash('Error'),
        Success: req.flash('success')
    }
    return res.status(200).render("ForgetEmail", { response })
}

exports.SendLink = async (req, res, next) => {
    try {

        // Joi Validation
        let valid = SendEmail_joi(req.body)
        if (valid) {
            req.flash("message", "All Fields Are Required")
            return res.redirect(req.originalUrl)
        }

        let user = await User.findOne({ where: { email: req.body.email } })

        if (!user) {
            req.flash("Error", "User not present")
            return res.redirect('/forget/password')
        }

        let secret = secretKey + user.id
        let token = sing({ userId: user.id }, secret, '5m')
        let link = `${req.protocol}://${req.get("host")}/password/reset/${user.id}/${token}`
        console.log({ link })

        // Sending Email
        // const message = `Your password reset token is :- \n\n ${link} \n\nIf you have not requested this email then, please ignore it.`;
        // sendMail(user.email, "forget Password", message)
        req.flash("success", `Email Sent Successfully`)
        return res.status(200).redirect('/forget/password')
    } catch (error) {
        return res.send({ error })
    }

}

exports.EjsForgetPasswordPage = (req, res) => {

    let response = {
        title: "Bike Ride",
        message: req.flash('message'),
        field: req.flash('field'),
        Error: req.flash('Error'),
        Success: req.flash('success')
    }

    return res.render("ForgetPassword", { response })
}


exports.ForgetPassword = async (req, res) => {
    // Joi Validation
    let valid = ForgetchangePwd_joi(req.body)
    if (valid) {
        req.flash("message", "All Fields Are Required")
        return res.redirect(req.originalUrl)
    }

    let { confirm_password, password } = req.body

    if (password !== confirm_password) {
        req.flash("message", "Password not match")
        return res.redirect(req.originalUrl)
    }

    let user = await User.findOne({ where: { id: req.params.id } })

    if (!user) {
        req.flash("message", "User Not Present")
        return res.redirect(req.originalUrl)
    }
    let secret = secretKey + user.id

    try {
        verify(req.params.token, secret)

        await User.update({ password }, {
            where: { id: user.id },
            individualHooks: true
        })
        return res.status(200).render('partials/Sucess')
    } catch (error) {
        req.flash("Error", "Somethin Went Wronge")
        return res.redirect(req.originalUrl)
        // return next(error)
    }
}

// LogOut 
exports.logout = (req, res) => {

    if (req.cookies.token) {
        req.session = null
        return res.clearCookie('token').redirect('/')
    }
    return res.redirect('/')
}

exports.GetUserProfile = async (req, res) => {

    let user = await User.findOne({ where: { id: req.user.id }, raw: true, attributes: { exclude: ['password', "createdAt", "updatedAt"] } })

    user.documentImage.replace(/"/g, "")
    user.documentImage = JSON.parse(user.documentImage)

    let response = {
        title: "Bike Ride",
        message: req.flash('message'),
        field: req.flash('field'),
        Error: req.flash('Error'),
    }

    // console.log(user)
    return res.render("Profile", { user, response, token: req.cookies.token, admin: req.Admin })
}

exports.UpdateProfile = async (req, res, next) => {
    try {
        UpdateProfileJoi.validateAsync(req.body)

        await User.update(req.body, {
            where: { id: req.params.id }
        })
        req.flash("message", "Profile Updates")
        return res.redirect('/profile')
    } catch (error) {
        req.flash("Error", "Something Went Wronge")
        return res.redirect('/profile')
    }
}

exports.UserImageUpdate = catchAsyncError(async (req, res, next) => {

    let image = await UpdateProfileImage(req, res)

    let user = await User.findOne({
        where: {
            id: req.user.id
        }
    })
    if (user.userImage) {
        DeleteUpdateProfileImage(user.userImage)
    }
    user.userImage = image.filename
    await user.save()

    req.flash("message", "Profile Updates")
    return res.redirect('/profile')
})
// User Image Deleted
exports.RemoveUserImage = catchAsyncError(async (req, res, next) => {

    let user = await User.findOne({
        where: {
            id: req.user.id
        }
    })
    if (!user) {
        req.flash("Error", "Something Is wronge")
        return res.redirect('/profile')

    }
    if (user.userImage) {
        if (user.userImage) {
            DeleteUpdateProfileImage(user.userImage)
        }
        user.userImage = ""
        await user.save()
    }

    req.flash("message", "Profile Updates")
    return res.redirect('/profile')
})

// User Booking 
exports.UserBooking = catchAsyncError(async (req, res, next) => {
    let offset = req.query.page ? (req.query.page - 1) * 10 : 0

    const vehicleBooking = await sequelize.query(`SELECT * FROM vehicle LEFT JOIN vahiclebooking ON vehicle.id = vahiclebooking.vehicleId WHERE vahiclebooking.userId=${JSON.stringify(req.user.id)} LIMIT 10 OFFSET ${offset}`, { type: QueryTypes.SELECT })

    for (let i of vehicleBooking) {
        i.image.replace(/"/g, '')
        i.image = JSON.parse(i.image)
    }

    return res.render('BookedList', { token: req.cookies.token, admin: req.Admin, vehicleBooking })

})

exports.EjsAdminDashBoard = async (req, res) => {

    let search = {
        raw: true,
        limit: 10,
        offset: req.query.page ? (req.query.page - 1) * 10 : 0
    }

    req.query.code ? search.where = { code: { [Op.like]: `%${req.query.code}%`, } } : "";
    req.query.price ? search.where = {
        price: {
            [Op.lte]: req.query.price
        }
    } : "";

    let response = {
        title: "Bike Ride",
        message: req.flash('message'),
        field: req.flash('field'),
        Error: req.flash('Error'),
        Success: req.flash('success')
    }

    const vehicleBooking = await VehicleBooking.findAll(search)
    // console.log(vehicleBooking)
    return res.render("admin/DashBoard", { vehicleBooking, response })
}
