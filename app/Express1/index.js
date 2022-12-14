const express = require("express")
const app =  express();

app.get("/",(request, response) =>{
    response.send("Bem vindo ao guia do programador")
})

app.listen(4000, (error) => {
    if (error) {
        console.log("Ocorreu um erro!")
    } else {
        console.log("Servidor iniciado com sucesso!")
    }
})