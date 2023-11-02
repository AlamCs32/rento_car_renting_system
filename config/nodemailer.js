const nodemailer = require('nodemailer')
require('dotenv').config()
let { nodemailerUser, nodemailerPass, host, port, secure } = process.env

let transport = nodemailer.createTransport({
    host: host,
    port: port,
    secure: secure,
    auth: {
        user: nodemailerUser,
        pass: nodemailerPass
    }
})

let sendMail = (email, sub = 'Bike web', message = 'Welcome to BikeRent') => {
    return new Promise((resolve, reject) => {
        transport.sendMail({
            from: nodemailerUser,
            to: email,
            subject: sub,
            html: message
        }, (error, res) => {
            if (error) {
                return reject(error)
            }
            return resolve(res)
        })
    })
}

module.exports = sendMail