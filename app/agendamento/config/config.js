require('dotenv').config()

exports.config = {
    dbHost: process.env.MONGO_PORT,
    dbDatabase: process.env.MONGO_DATABASE,
    dbUser: process.env.MONGO_USER,
    dbPassword: process.env.MONGO_PASSWORD,
    mailHost: process.env.MAIL_HOST,
    mailPort: process.env.MAIL_PORT,
    mailUsername: process.env.MAIL_USERNAME,
    mailPassword: process.env.MAIL_PASSWORD,
}