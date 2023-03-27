const jwt = require("jsonwebtoken")
require("dotenv/config")

module.exports = function auth (req, res, next) {
    const token =  req.headers['authorization']?.split(' ')[1]

    if (token != undefined) {
        const jwtSecrete = process.env.jwt_secret

        jwt.verify(token, jwtSecrete,(error, data) => {
            if (!error) {
                req.auth = {id: data.id, email: data.email}
                return next()
            }
        })
    }
    
    res.status(401)
    return res.json({error: "Token Invalido!"})
}