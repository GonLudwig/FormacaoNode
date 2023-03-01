const express = require("express")
const bodyParse = require("body-parser")
const app = express()
const DB = require("./database")

app.use(bodyParse.urlencoded({extended: false}))
app.use(bodyParse.json())

app.get("/", (req, res) => {
    res.json("Introdução Api RestFull")
})

app.get("/games", (req, res) => {
    res.statusCode = 200
    res.json(DB.games)
})

app.get("/games/:id", (req, res) => {
    let id = req.params.id

    if (isNaN(id)) {
        res.sendStatus(400)
    } else {
        id = parseInt(id)

        let game = DB.games.find(game => game.id == id)

        if (game == undefined) {
            res.sendStatus(404)
        }

        res.json(game)
    }
})

app.listen(3000, () => console.log("Servidor Ligado!"))