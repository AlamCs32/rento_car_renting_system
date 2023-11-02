const express = require('express')
const userRouter = require('./userRoute')
const bikeRoutes = require('./vehicleRoutes')
const router = express.Router()

router.use(userRouter)
router.use(bikeRoutes)

// Glodel 404 Page
router.route('*').get((req, res) => {
    return res.status(404).render("404")
})

module.exports = router