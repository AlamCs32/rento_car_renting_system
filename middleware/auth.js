const { verify } = require('../service/token_service')
const { User } = require('../models')
const { IsAuthorize } = require('../service/CustomError')

const auth = async (req, res, next) => {
    try {
        let token = req.cookies.token
        if (!token) {
            req.flash("message", "pls Login")
            return res.status(200).redirect('/login')
        }
        let { userId } = verify(token)
        req.user = await User.findOne({
            where: {
                id: userId
            }
        })
        next()
    } catch (error) {
        req.flash("message", "pls Login")
        return res.status(200).redirect('/login')
    }
}
// Role Authentication Middleware
let isAuthorize = (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            return next(IsAuthorize())
        }
        next()
    }
}

// Token Check 
let TokenCheck = async (req, res, next) => {
    if (!req.cookies.token) {
        req.Admin = false
        return next()
    }
    let { userId } = verify(req.cookies.token)
    req.user = await User.findOne({
        where: {
            id: userId
        }
    })
    req.user.role === "admin" ? req.Admin = true : req.Admin = false;
    next()
}

module.exports = { auth, isAuthorize, TokenCheck }