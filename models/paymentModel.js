const { sequelize, Model, DataTypes } = require('../config/dbConfig')
const User = require('./userModel')
const VehicleBooking = require('./vehicleBooking')

class Payment extends Model { }

Payment.init({

    userId: {
        type: DataTypes.STRING
    },
    bookingId: {
        type: DataTypes.INTEGER
    },
    amount: {
        type: DataTypes.INTEGER
    },
    method: {
        type: DataTypes.ENUM('UPI', 'CASH', 'DEBIT CARD'),
        defaultValue: "CASH"
    },
    status: {
        type: DataTypes.ENUM('PAID', 'PENDING', 'REFUND', "CANCLE"),
        defaultValue: "PENDING"
    },
    payment_details: {
        type: DataTypes.STRING,
    }

}, {
    sequelize,
    modelName: "Payment",
    tableName: "Payment",
})

Payment.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id"
})

Payment.belongsTo(VehicleBooking, {
    foreignKey: "bookingId",
    targetKey: "id"
})

// Payment.sync({ force: true }).then(() => console.log("Table Created")).catch(error => console.log({ error }))

module.exports = Payment