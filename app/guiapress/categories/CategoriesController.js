const express = require("express")
const router = express.Router()
const Category = require("./Category")
const slugify = require("slugify")
const adminAuth = require("../middlewares/adminAuth")

router.get("/admin/categories/new", adminAuth, (req, res) => {
    res.render("admin/categories/new")
})

router.post("/categories/save", adminAuth, (req, res) => {
    let title = req.body.title
    if (title != undefined) {
        return Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/")
        })
    }
    
    res.redirect("/admin/categories/new")
})

router.get("/admin/categories", adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/categories/index", {categories: categories})
    })
})

router.post("/categories/delete", adminAuth, (req, res) => {
    let id = req.body.id

    if (id != undefined) {
        if (!isNaN(id)) {
            return Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/categories")
            })
        }
    }

    res.redirect("/admin/categories")
})

router.get("/admin/categories/edit/:id", adminAuth, (req, res) => {
    let id = req.params.id

    if (isNaN(id)) {
        return res.redirect("/admin/categories")
    }
    
    Category.findByPk(id).then(category => {
        if(category != undefined) {
            return res.render("admin/categories/edit", {category: category})
        }

        return res.redirect("/admin/categories")
    }).catch((error) => {
        console.log(error)
    })
})

router.post("/categories/update", adminAuth, (req, res) => {
    let id = req.body.id
    let title = req.body.title

    Category.update({
        title: title,
        slug: slugify(title)
    }, {
        where: {id: id}
    }).then(() => {
        res.redirect("/admin/categories")
    })
})


module.exports = router