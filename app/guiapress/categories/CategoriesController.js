const express = require("express")
const router = express.Router()

router.get("/categories", (req, res) => {
    res.send("Categoria")
})

router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new")
})

module.exports = router