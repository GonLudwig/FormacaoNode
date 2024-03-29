const Sequelize = require("sequelize")

const connection = new Sequelize(
    process.env.MYSQL_DATABASE, 
    process.env.MYSQL_USER, 
    process.env.MYSQL_PASSWORD, 
    {
        host: 'mysql',
        dialect: 'mysql'
    }
)

module.exports = connection