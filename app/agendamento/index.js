const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/connection')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.send('Oiii')
})

app.listen(9001, () => {
    console.log('App: on')
})