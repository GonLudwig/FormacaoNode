const { Router } = require("express")
const express = require("express")
const router = express.Router()

router.get("/articles", (req, res) => {
    res.send("Article route")
})

router.post("/admin/articles/new", (req, res) => {
    res.send("New Article route")
})

module.exports = router