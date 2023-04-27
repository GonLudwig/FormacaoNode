const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: String,
    email: String,
    cpf: String,
    description: String,
    dateInicio: Date,
    dateFim: Date,
    finished: {
        type: Boolean,
        default: false
    }
})

const Appointment = mongoose.model('Appointment', schema)

module.exports =  Appointment