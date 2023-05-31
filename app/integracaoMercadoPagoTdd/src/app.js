const express = require('express')
const app = express()
const MercadoPago = require('mercadopago')
const {config} = require('./config/config')

MercadoPago.configure({
    sandbox: true,
    access_token: config.mercadoPagoToken
})

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/pagar', async (req, res) => {
    let id = "" + Date.now()
    let emailPayment = 'teste@gmail.com'

    let dataPayment = {
        items: [
            item = {
                id,
                title: "Produto",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(150)
            }
        ],
        payer: {
            emailPayment
        },
        external_reference: id
    }

    try {
        let payment = await MercadoPago.preferences.create(dataPayment)
        console.log(payment)
        return res.redirect(payment.body.init_point)
    } catch (error) {
        return res.send(error.message)
    }
})

app.post('/notification', (req, res) => {
    let id = req.query.id

    let filtro = {
        "order.id": id
    }

    MercadoPago.payment.search({
        qs: filtro
    }).then(data => {
        let pagamento = data.body.results[0]

        if (pagamento != undefined) {
            console.log(pagamento)
        } else {
            console.log("Pagamento não existe!")
        }
    })
    
    res.send('ok')
})

app.get('/', (req, res) => {
    res.send("Ola mundo!")
})

module.exports = app