const express = require('express')
const app = express()
const connection = require('./database/connection')
const UserRepository = require('./repositories/UserRepository')
const jwt = require('jsonwebtoken')
const jwtSecret = 'klasjdhoijoinakdjfngcvob[SODF'

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({})
})

app.post('/user', async (req, res) => {
    let response = await UserRepository.create(req.body)

    if (response.error !== undefined) {
        return res.status(401).json(response)
    }
    
    return res.json(response)
})

app.delete('/user/:email', async (req, res) => {
    let response = await UserRepository.delete(req.params.email)
    if (response.error !== undefined) {
        return res.status(401).json(response)
    }
    
    return res.json(response)
})

app.post('/login', async (req, res) => {
    let { email, password } = req.body

    let user = await UserRepository.findOne({email, password})
    
    if (user == null) {
        return res.status(401).json({message: "Credenciais Incorretas!"})
    }

    jwt.sign({email},jwtSecret,{expiresIn: '48h'},(err, token) => {
        if(err){
            return res.sendStatus(500);
        }

        return res.json({token})
    })

})

module.exports = app