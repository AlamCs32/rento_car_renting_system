const express = require('express')
const { PaymentPage, PaymentPay, GetPayments } = require('../controller/Payment')
const { Singup, Login, ChangePwd, SendLink, ForgetPassword, GetUserProfile, UpdateProfile, UserImageUpdate, RemoveUserImage, UserBooking, EjsLoginPage, EjsSingupPage, EjsChangePassword, EjsSendLink, EjsForgetPasswordPage, logout, EjsAdminDashBoard } = require('../controller/userController')
const { auth, TokenCheck, isAuthorize } = require('../middleware/auth')

const router = express.Router()

router.route('/singup')
    .get(EjsSingupPage) //Ejs Page
    .post(Singup)

router.route('/login')
    .get(EjsLoginPage) //Ejs Page
    .post(Login)

router.route('/change/password')
    .get(auth, EjsChangePassword) //Ejs Page 
    .put(auth, ChangePwd)

router.route('/forget/password')
    .get(EjsSendLink)
    .post(SendLink)

router.route('/password/reset/:id/:token')
    .get(EjsForgetPasswordPage) //Ejs Page 
    .put(ForgetPassword)

router.get('/logout', auth, logout)

// @Admin || @User Profile
router.route('/profile')
    .get(auth, GetUserProfile) //EJS PAGE 

router.put('/profile/:id', auth, TokenCheck, UpdateProfile)

router.route('/user/images/:id').put(auth, UserImageUpdate)

router.route('/user/image/:id').delete(auth, RemoveUserImage)

// ADmin DashBoard Not Included Anyware
router.get('/dashboard', auth, isAuthorize("admin"), EjsAdminDashBoard)
// Payment Route
router.route('/payment/:id').get(auth, PaymentPage).post(auth, PaymentPay)
router.get('/dashboard/payment', auth, isAuthorize("admin"), GetPayments)

// Get User Booking
router.route('/user/booking').get(auth, TokenCheck, UserBooking)

module.exports = router