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

app.get("/", (req, res) => {
    Article.findAll({
        orderBy: [
            ['id', 'DESC']
        ]
    }).then(articles => {
        Category.findAll({
            orderBy: [
                ['title', 'ASC']
            ]
        }).then( categories => {
            res.render("index", {articles: articles, categories: categories})
        })
    })
})

app.get("/category/:slug", (req, res) => {
    let slug = req.params.slug

    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category => {
        if (category != undefined) {
            Category.findAll().then( categories => {
                res.render("index", {articles: category.articles, categories: categories})
            })
        }else{
            res.redirect("/")
        }
    })
})

app.get("/:slug", (req, res) => {
    let slug = req.params.slug

    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then( categories => {
                return res.render("article", {article: article, categories: categories})
            })
        }

        res.redirect("/")
    })
})

app.use("/", articlesController)

app.use("/", categoriesController)

app.listen(3000, () => {console.log("Aplicação ativa")})
