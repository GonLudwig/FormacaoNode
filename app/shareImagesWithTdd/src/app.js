const express = require('express')
const app = express()
const connection = require('./database/connection')
const UserRepository = require('./repositories/UserRepository')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({})
})

app.post('/user', async (req, res) => {
    let response = await UserRepository.create(req.body)
    
    res.json(response)
})
module.exports = app