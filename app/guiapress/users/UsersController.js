const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const User = require("./User")

router.get("/admin/users", (req, res) => {
    res.send("listagem de Usarios")
})

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create")
})

router.post("/users/create", (req, res) => {
    let email = req.body.email
    let salt = bcrypt.genSaltSync(10)
    let password = bcrypt.hashSync(req.body.password, salt)

    User.create({
        email: email,
        password: password
    }).then(() => {
        res.redirect("/")
    }).catch(error => {
        res.json(error)
    })
})

module.exports = router