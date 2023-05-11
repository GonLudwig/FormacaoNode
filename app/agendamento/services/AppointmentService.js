const AppointmentFactory = require('../factories/AppointmentFactory')
const Appointment = require('../models/Appointment')
const nodeMailerService = require('./nodeMailerService')

class AppointmentService {

    async create(dados)
    {
        try {
            return await Appointment.create(dados)
        } catch (error) {
            console.log(error)
        }
    }

    async index(showFinished, filters = {})
    {
        try {
            if (!showFinished) {
                filters.finished = false
                let dados = await Appointment.find(filters)
                return AppointmentFactory.build(dados)
            }
            return await Appointment.find(filters)
        } catch (error) {
            console.log(error)
        }
    }

    async show(appointmentId)
    {
        try {
            return await Appointment.findOne({_id: appointmentId})
        } catch (error) {
            console.log(error)
        }
    }

    async finished(appointmentId)
    {
        try {
            await Appointment.findByIdAndUpdate(appointmentId, {finished: true})
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async search(query)
    {
        try {
            return await Appointment.find().or([{email: query}, {cpf: query}])
        } catch (error) {
            console.log(error)
        }
    }

    async sendNotification(){
        let appointments = await this.index(false, {notified: false})

        appointments.forEach(appointment => {
            let gap = appointment.start.getTime() - Date.now()
            let hour = 60 * 60000
            if (gap < hour) {
                nodeMailerService.sendMail({
                    from: '"Fred Foo" <exempla@gmail.com>',
                    to: "bar@example.com",
                    subject: "Sua consulta vai acontecer em breve!",
                    text: "Sua consulta vai acontecer em menos de 1 hora.",
                }).then(() => {
                    Appointment.findByIdAndUpdate(appointment.id, {notified: true})
                        .then(() => {})
                        .catch(err => {console.log(err)})
                }).catch(err => {
                    console.log(err)
                })
            }
        });
    }

}

module.exports = new AppointmentService()