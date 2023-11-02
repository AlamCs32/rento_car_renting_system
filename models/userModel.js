const { sequelize, Model, DataTypes } = require('../config/dbConfig')
const bcrypt = require('bcrypt')

class User extends Model { }

User.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
        unique: {
            arg: true,
            msg: 'This username is already taken.'
        }
    },
    email: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: "Email should be valid Email" },
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        require: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    role: {
        type: DataTypes.ENUM('user', 'admin', 'owner'),
        defaultValue: 'user',
        validate: {
            isIn: {
                args: [['user', 'admin', 'owner']],
                msg: "role should be user admin or owner'"
            }
        }
    },
    userImage: {
        type: DataTypes.STRING
    },
    documentImage: {
        type: DataTypes.JSON
    }
}, {
    sequelize,
    modelName: "User",
    tableName: "User"
})

User.beforeCreate(async (user, options) => {
    let salt = await bcrypt.genSalt(11)
    user.password = await bcrypt.hash(user.password, salt)
})

User.beforeUpdate(async (user, options) => {
    let salt = await bcrypt.genSalt(11)
    user.password = await bcrypt.hash(user.password, salt)
})

User.ComparePassword = async (password, encryptPassword) => {
    return await bcrypt.compare(password, encryptPassword)
}

// User.sync({ force: true }).then(() => console.log("table is created")).catch(error => console.log({ error }))

module.exports = User