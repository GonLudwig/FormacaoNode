const User = require('../models/User')

class UserRepository
{
    async create(dados)
    {
        try {
            return User.create(dados)
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

module.exports = new UserRepository()