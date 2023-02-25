const connection = require("../database")
const Sequelize = require("sequelize")
const bcrypt = require("bcryptjs")

let salt = bcrypt.genSaltSync(10)

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

User.sync().then(async() => {

    await User.create({
        email: "admin@admin.com.br",
        password: bcrypt.hashSync("admin", salt)
    })
})

module.exports = User