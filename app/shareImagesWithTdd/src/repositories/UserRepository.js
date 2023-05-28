const User = require('../models/User')

class UserRepository
{
    async create(dados)
    {
        try {
            return await User.create(dados)
        } catch (error) {
            return {error: error.errors}
        }
    }
}

module.exports = new UserRepository()