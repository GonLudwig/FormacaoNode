const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const User = require("./User")
const adminAuth = require("../middlewares/adminAuth")

router.get("/admin/users", adminAuth, (req, res) => {
    res.send("listagem de Usarios")
})

router.get("/admin/users/create", adminAuth, (req, res) => {
    res.render("admin/users/create")
})

router.post("/users/create", adminAuth, (req, res) => {
    let email = req.body.email
    
    User.findOne({where: {email: email}}).then( user => {
        if (user == undefined) {
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
        } else {
            res.redirect("/admin/users/create")
        }
    })

})

router.get("/login", (req, res) => {
    res.render("admin/users/login")
})

router.post("/authenticate", (req, res) => {
    let email = req.body.email
    let password = req.body.password

    User.findOne({where: {email: email}}).then(user => {
        if (user != undefined) {
            let validation = bcrypt.compareSync(password, user.password)
            if (validation) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("/admin/articles")
            } else {
                res.redirect("/login")    
            }
        } else {
            res.redirect("/login")
        }
    })
})

router.get("/logout", (req, res) => {
    req.session.user = undefined
    res.redirect("/")
})
module.exports = router