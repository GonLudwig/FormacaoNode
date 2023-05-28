const app = require("express")()
const session = require("express-session")
const bodyParser = require("body-parser")
const flash = require("express-flash")

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}))

app.use(flash())

app.get("/", (req, res) => [
    res.render("index")
])

app.listen(3000, (req, res) => {
    console.log("Servidor rodando!")
})