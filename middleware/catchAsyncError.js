const { sequelize, ValidationError } = require('../config/dbConfig')


module.exports = (theFunc) => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(async error => {
        if (error instanceof ValidationError) {
            let t = await sequelize.transaction()
            await t.rollback()
            req.flash("Error", error.message)
            return res.redirect(req.originalUrl)
        }
        req.flash("Error", error.message)
        return res.redirect(req.originalUrl)
    })
}