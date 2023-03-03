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

app.post("/games", (req, res) => {
    let {titulo, ano, preco} = req.body

    DB.games.push({
        id: (+DB.games.length) + 1,
        titulo: titulo,
        ano: ano,
        preco: preco
    })

    res.sendStatus(200)
})

app.delete("/games/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        let id = req.params.id
        let index = DB.games.findIndex(game => id === game.id)
        if (index >= 0) {
            DB.games.splice(id,1)
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    }
})

app.put("/games/:id", (req, res) => {
    let id = req.params.id

    if (isNaN(id)) {
        res.sendStatus(400)
    } else {
        id = parseInt(id)

        let game = DB.games.find(game => game.id == id)

        if (game == undefined) {
            res.sendStatus(404)
        }else {
            let {title, price, year} = req.body

            if (title != undefined) {
                game.title = title
            }
            if (price != undefined) {
                game.price = price
            }
            if (year != undefined) {
                game.year = year
            }
            res.sendStatus(201)
        }
    }
})

app.listen(3000, () => console.log("Servidor Ligado!"))