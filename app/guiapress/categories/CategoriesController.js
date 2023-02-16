const express = require("express")
const router = express.Router()

router.get("/categories", (req, res) => {
    res.send("Categoria")
})

router.post("/admin/categories/new", (req, res) => {
    res.send("Create categories")
})

module.exports = router