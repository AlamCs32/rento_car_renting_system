const { sequelize, Model, DataTypes } = require('../config/dbConfig')
const Vehicle = require('./vehicleModel')

class Specification extends Model { }

Specification.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true
    },
    bikeId: {
        type: DataTypes.UUID,
    },
    mileage: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
    },
    engineType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    noOfCylinders: {
        type: DataTypes.INTEGER(2),
        defaultValue: 1,
        allowNull: false
    },
    Displacement: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    MaxPower: {
        type: DataTypes.STRING(10),
        defaultValue: "none"
    },
    MaxTorque: {
        type: DataTypes.STRING(10),
        defaultValue: "none"
    },
    FrontBrake: {
        type: DataTypes.STRING(10),
        defaultValue: "Drum Brake",
        allowNull: false
    },
    RearBrake: {
        type: DataTypes.STRING(10),
        defaultValue: "Drum Brake",
        allowNull: false
    },
    FuelCapacity: {
        type: DataTypes.INTEGER(10),
    },
    ABS: {
        type: DataTypes.STRING(20),
        defaultValue: "NO",
    },
    Speedometer: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Specification",
    tableName: "Specification"
})

// Specification.sync({ force: true }).then(res = console.log("Table is created")).catch(error => console.log({ error }))

Specification.belongsTo(Vehicle, {
    foreignKey: "bikeId",
    targetKey: "id"
})

module.exports = Specification