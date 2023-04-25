const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.set('view engine', 'ejs')

io.on('connection', (client) => {
    client.on("disconnect", () =>{
        console.log('X desconectou: '+ client.id)
    })

    client.on('palavra', (data) =>{
        client.emit('resultado', data + ' - socker.io')
    })
})

app.get('/', (req, res) => {
    res.render('index')
})

http.listen('3000', () => {
    console.log("App: On")
})