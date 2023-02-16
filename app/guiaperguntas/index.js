const express = require("express")
const bodyParse = require("body-parser")
const app = express()
const connection = require("./database/database")
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta")

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
    Pergunta.findAll({raw: true, order: [
        ['id', 'DESC']
    ]}).then( perguntas => {
            res.render("index", {
                perguntas: perguntas
            })
    })
})

app.get("/perguntar", (req, res) => {
    res.render("perguntar")
})

app.get("/pergunta/:id", (req, res) => {
    let id = req.params.id
    Pergunta.findOne({where:{id: id}}).then(pergunta => {
        if (pergunta == undefined) {
            return res.redirect("/")
        }
        Resposta.findAll({
            raw: true,
            where: {perguntaId : pergunta.id},
            order: [
                ['id', 'DESC']
            ]
        }).then(respostas => {
            res.render("pergunta", {
                pergunta: pergunta,
                respostas: respostas
            })
        })
    })
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

app.post("/responder", (req, res) => {
    let corpo = req.body.corpo
    let perguntaId = req.body.perguntaId
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect(`/pergunta/${perguntaId}`)
    })
})

app.listen(3000, () => {console.log("Aplicacao rodando com sucesso!")})