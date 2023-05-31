require('dotenv').config()

exports.config = {
    dbHost: process.env.MONGO_PORT,
    dbDatabase: process.env.MONGO_DATABASE,
    dbUser: process.env.MONGO_USER,
    dbPassword: process.env.MONGO_PASSWORD,
    mercadoPagoToken: process.env.MERCADO_PAGO_TOKEN
}