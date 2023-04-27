const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/connection')
const appointmentService = require('./services/AppointmentService')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('index')
})

app.get('/cadastro',(req, res) => {
    res.render('create')
})

app.post('/appointment', async (req, res) => {
    let response = await appointmentService.create(req.body)

    if (response) {
        return res.redirect('/')
    }

    return res.send('Ocorreu uma falha!')
})

app.get('/appointment', async (req, res) => {
    let resultados = await appointmentService.index(false)
    res.json(resultados)
})

app.listen(3000, () => {
    console.log('App: on')
})