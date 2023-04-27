const AppointmentFactory = require('../factories/AppointmentFactory')
const Appointment = require('../models/Appointment')

class AppointmentService {

    async create(dados)
    {
        try {
            return await Appointment.create(dados)
        } catch (error) {
            console.log(error)
        }
    }

    async index(showFinished)
    {
        try {
            if (!showFinished) {
                let dados = await Appointment.find({finished: false})
                return AppointmentFactory.build(dados)
            }
            return await Appointment.find()
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new AppointmentService()