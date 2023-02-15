const express = require("express")
const bodyParse = require("body-parser")
const app = express()
const connection = require("./database/database")
const Pergunta = require("./database/Pergunta")

connection
    .authenticate()
    .then(() =>{
        console.log("Conectado com sucesso!")
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParse.urlencoded({extended: false}))
app.use(bodyParse.json())

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/perguntar", (req, res) => {
    res.render("perguntar")
})

app.post("/salvarpergunta", (req, res) => {
    let titulo = req.body.titulo
    let descricao = req.body.descricao

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    })

})

app.listen(3000, () => {console.log("Aplicacao rodando com sucesso!")})