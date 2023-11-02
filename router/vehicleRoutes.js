const express = require('express')
const { GetVehicle, AddVahicle, VehicleUpdate, VehicleDelete, GetVehicleDetails, BookVehicle, BookingCancle, BookApprove, SearchBooking, AdminSearchVehicle, AdminBookingSearchDetails, BookingVehicleDetails, PageBooking, HomePage, EjsAddVehicle, EjsAddVehicleUpdatePage, EjsBookedListPage } = require('../controller/vehicleController')
const { auth, isAuthorize, TokenCheck } = require('../middleware/auth')
const router = express.Router()

router.get('/boss', (req, res) => { //Working in this function
    return res.render("Boos")
})

//Get all Vehicle 
router.get('/search', TokenCheck, GetVehicle)
// Main Home Page 
router.get('/', TokenCheck, HomePage)
// router.get('/:id', TokenCheck, GetVehicleDetails) //Get Vehicle details Working

router.route('/vehicle/add')
    .get(auth, isAuthorize("admin"), EjsAddVehicle) // Add Vehicle Ejs Page
    .post(auth, isAuthorize('admin', 'owner'), AddVahicle) //Add Vehicle details 

router
    .route('/vehicle/:id') //Some Modification is required
    .get(auth, isAuthorize('admin'), EjsAddVehicleUpdatePage)  // Ejs Admin Update Page
    .put(auth, isAuthorize('admin', 'owner'), VehicleUpdate)//update Vehicle details 
    .delete(auth, isAuthorize('admin', 'owner'), VehicleDelete)//Vehicle Delete Api

// User Booking


router.route('/book/:id')
    .get(auth, PageBooking) //Booking Page Ejs 
    .post(auth, BookVehicle)
    .delete(auth, BookingCancle)

router.get('/booked/list', auth, TokenCheck, EjsBookedListPage)

router.get('/booking/:id', auth, TokenCheck, BookingVehicleDetails)

router.route('/book/approve/:id').post(auth, isAuthorize("admin"), BookApprove)

router.get('/admin/search', auth, isAuthorize('admin'), AdminSearchVehicle)

router.get('/admin/booking', auth, isAuthorize('admin'), SearchBooking)

router.get('/admin/booking/:id', auth, isAuthorize('admin'), AdminBookingSearchDetails)


module.exports = router