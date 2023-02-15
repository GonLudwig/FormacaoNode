const { response } = require("express");
const express = require("express")
const app =  express();

app.get("/",(request, response) =>{
    response.send("Bem vindo ao guia do programadorrrrr")
})

app.get("/blog/:artigo?", (req, res) => {
    let artigo = req.params.artigo

    if (artigo) {
        res.send("Com parametro artigo: "+ artigo)
    }else {
        res.send("Bem vindo ao meu blog")
    }
})

app.get("/ola/:nome", (req, res) => {
    let nome = req.params.nome
    res.send("<h1>"+ nome + "</h1>")
})


app.get("/canal/youtube", (req, res) => {
    let canal = req.query["canal"]

    if (canal) {
        res.send(canal)
    } else {
        res.send("Nenhum canal enviado!")
    }
})

app.listen(4000, (error) => {
    if (error) {
        console.log("Ocorreu um erro!")
    } else {
        console.log("Servidor iniciado com sucesso!")
    }
})