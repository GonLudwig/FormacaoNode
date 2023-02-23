const connection = require("../database/database")
const Sequelize = require("sequelize")

const User = connection.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password : {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = User