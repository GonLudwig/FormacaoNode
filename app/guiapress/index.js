const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const articlesController = require("./articles/ArticlesController")
const categoriesController = require("./categories/CategoriesController")
const Category = require("./categories/Category")
const Article = require("./articles/Article")

connection
    .authenticate()
    .then(() => {
        console.log("Banco conectado com sucesso!")
    })
    .catch((msgErro) => {
        console.log(`Error connection: ${msgErro}`)
    })

app.set("view engine", "ejs")

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extented: false}))

app.use(bodyParser.json())

app.use("/", articlesController)

app.use("/", categoriesController)

app.get("/", (req, res) => {
    res.render("index")
})

app.listen(3000, () => {console.log("Aplicação ativa")})
