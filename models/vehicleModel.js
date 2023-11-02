const { sequelize, Model, DataTypes } = require('../config/dbConfig')

class Vehicle extends Model { }

Vehicle.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER(5),
        require: true
    },
    year: {
        type: DataTypes.STRING,
        require: true
    },
    model: {
        type: DataTypes.STRING,
        require: true
    },
    category: {
        type: DataTypes.STRING,
        require: true
    },
    type: {
        type: DataTypes.ENUM('petrol', 'diesel', 'electric'),
        validate: {
            isIn: {
                args: [['petrol', 'diesel', 'electric']],
                msg: "type must be patrol diesel or electric"
            }
        }
    },
    gearType: {
        type: DataTypes.ENUM("manual", "automatic"),
        allowNull: false,
        validate: {
            isIn: {
                args: [["manual", "automatic"]],
                msg: "gear type must be manual or automatic"
            }
        }
    },
    mileage: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner: {
        type: DataTypes.UUID,
    },
    updatedBy: {
        type: DataTypes.UUID,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    locationInMap: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    image: {
        type: DataTypes.JSON
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    VehicleNumber: {
        type: DataTypes.STRING(55),
        require: true
    }
}, {
    sequelize,
    tableName: "Vehicle",
    modelName: "Vehicle"
})

// Vehicle.sync({ force: true }).then(res = console.log("Table is created")).catch(error => console.log({ error }))

module.exports = Vehicle