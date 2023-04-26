const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.set('view engine', 'ejs')

io.on('connection', (socket) => {
    socket.on('mensagem', (data) => {
        io.emit('showmensagem', data)
    })
    
    socket.on("disconnect", () =>{
        console.log('X desconectou: '+ socket.id)
    })
})

app.get('/', (req, res) => {
    res.render('index')
})

http.listen('3000', () => {
    console.log("App: On")
})