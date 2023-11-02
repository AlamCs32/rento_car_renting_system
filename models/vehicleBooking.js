const { sequelize, Model, DataTypes } = require('../config/dbConfig')
const User = require('./userModel')
const Vehicle = require('./vehicleModel')
const moment = require('moment')

class VehicleBooking extends Model { }

VehicleBooking.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true
    },
    userId: {
        type: DataTypes.UUID
    },
    vehicleId: {
        type: DataTypes.UUID
    },
    code: {
        type: DataTypes.INTEGER,
        defaultValue: Math.floor(1000 + Math.random() * 9000)
    },
    status: {
        type: DataTypes.ENUM('booked', 'cancle', 'taken', 'return'),
        defaultValue: "booked"
    },
    bookTime: {
        type: DataTypes.STRING
    },
    returnTime: {
        type: DataTypes.STRING
    },
    Date: {
        type: DataTypes.STRING,
        defaultValue: moment().format('YYYY-MM-DD')
    },
    returnDate: {
        type: DataTypes.STRING,
        defaultValue: moment().format('YYYY-MM-DD')
    },
    ActualReturnTime: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER
    },
    totalMinute: {
        type: DataTypes.STRING
    },
    totalHours: {
        type: DataTypes.STRING
    },
    totalAmmount: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: "VahicleBooking",
    tableName: "VahicleBooking",
})

VehicleBooking.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id"
})

VehicleBooking.belongsTo(Vehicle, {
    foreignKey: "vehicleId",
    targetKey: "id"
})

// VehicleBooking.sync({ force: true }).then(() => console.log("Table Created")).catch(error => console.log({ error }))

module.exports = VehicleBooking