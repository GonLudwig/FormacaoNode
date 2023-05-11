class AppointmentFactory
{
    build(appointments)
    {
        let build = []
        appointments.forEach(element => {
            build.push({
                id: element._id,
                title: element.name + " - " + element.description,
                email: element.email,
                start: element.dateInicio,
                end: element.dateFim,
                notified: element.notified
            })
        });

        return build
    }
}

module.exports = new AppointmentFactory()