const mongoose = require('mongoose')
const {config} = require('../config/config')

mongoose.connect(`mongodb://${config.dbUser}:${config.dbPassword}@mongo:27017/${config.dbDatabase}?authSource=admin`)

mongoose.connection.on('error', err => {
    console.log(err);
})

module.exports = mongoose.connection