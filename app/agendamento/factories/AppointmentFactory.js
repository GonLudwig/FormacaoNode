class AppointmentFactory
{
    build(appointments)
    {
        let build = []
        appointments.forEach(element => {
            build.push({
                id: element._id,
                title: element.name + " - " + element.description,
                start: element.dateInicio,
                end: element.dateFim
            })
        });

        return build
    }
}

module.exports = new AppointmentFactory()