const { Sequelize, Model, DataTypes, QueryTypes, Op, ValidationError } = require('sequelize')

const sequelize = new Sequelize("mysql://root@localhost/bikeride", { logging: false })
// const sequelize = new Sequelize("mysql://root@localhost/bikeride")

sequelize.authenticate().then(() => console.log("Database is Connected")).catch(error => console.log(error))

module.exports = { sequelize, Model, QueryTypes, DataTypes, Op, ValidationError }