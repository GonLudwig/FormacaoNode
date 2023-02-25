const { Router } = require("express")
const express = require("express")
const router = express.Router()
const Category = require("../categories/Category")
const Article = require("./Article")
const slugify = require("slugify")
const adminAuth = require("../middlewares/adminAuth")

router.get("/admin/articles", adminAuth, (req, res) => {
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
        res.render("admin/articles/index", {articles: articles})
    })
})

router.get("/admin/articles/new", adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories: categories})
    })
})

router.get("/admin/articles/edit/:id", adminAuth, (req, res) => {
    let id = req.params.id
    if (isNaN(id)) {
        return res.redirect("/admin/articles")
    }
    
    Article.findByPk(id).then(article => {
        console.log(article)
        if(article != undefined) {
            Category.findAll().then(categories => {
                res.render("admin/articles/edit", {article: article, categories: categories})
            })
        }else {
            res.redirect("/admin/articles")
        }

    }).catch((error) => {
        console.log(error)
    })
})


router.post("/articles/save", adminAuth, (req, res) => {
    let title = req.body.title
    let body = req.body.body
    let categoryId = req.body.category

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: categoryId
    }).then(() => {
        res.redirect("/admin/articles")
    })

})

router.post("/articles/delete", adminAuth, (req, res) => {
    let id = req.body.id

    if (id != undefined) {
        if (!isNaN(id)) {
            return Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles")
            })
        }
    }

    res.redirect("/admin/articles")
})

router.post("/articles/update", adminAuth, (req, res) => {
    let id = req.body.id
    let title = req.body.title
    let body = req.body.body
    let categoryId = req.body.category

    Article.update({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: categoryId
    }, {
        where: {id: id}
    }).then(() => {
        res. redirect("/admin/articles")
    })
})

router.get("/articles/page/:num", (req, res) => {
    let page = parseInt(req.params.num)
    if (isNaN(page)) {
        page = 0
    }
    
    let limit = 5
    let offset = page * limit

    Article.findAndCountAll({
        offset: offset,
        limit: limit,
        orderBy: [
            ['id', 'DESC']
        ]
    }).then(articles => {
        articles.next = false
        articles.page = page

        if(articles.count > offset + limit){
            articles.next = true
        }

        Category.findAll({
            orderBy: [
                ['title', 'ASC']
            ]
        }).then( categories => {
            res.render("admin/articles/pagination", {articles: articles, categories: categories})
        })
    })
})

module.exports = router