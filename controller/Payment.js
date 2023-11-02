const { VehicleBooking, Payment, User } = require('../models')
const sendMail = require('../config/nodemailer')

exports.PaymentPage = async (req, res) => {

    let vehicleBooking = await VehicleBooking.findOne({
        where: {
            id: req.params.id
        }, raw: true
    })

    return res.render('payment/PaymentForm', { vehicle: vehicleBooking })
}

exports.PaymentPay = async (req, res) => {

    let payment = await Payment.create(req.body)

    let user = await User.findOne({
        where: {
            id: req.body.userId
        }
    })

    // Email Sending To User
    // sendMail(user.email, "Rentro Payment", `<h1> Your Payment of ${payment.amount} is SuccessFull </h1>`)

    req.flash('success', "Payment SuccessFul")
    return res.redirect('/dashboard/payment')
}

exports.GetPayments = async (req, res) => {

    let payment = await Payment.findAll()

    return res.render('admin/AllPayment', { payment })

}