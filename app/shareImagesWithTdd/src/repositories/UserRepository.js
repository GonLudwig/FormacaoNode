const User = require('../models/User')

class UserRepository
{
    async findOne(dados)
    {
        try {
            return await User.findOne(dados)
        } catch (error) {
            return {error: error.errors}
        }
    }

    async create(dados)
    {
        try {
            return await User.create(dados)
        } catch (error) {
            return {error: error.errors}
        }
    }

    async delete(email)
    {
        try {
            return await User.deleteOne({email})
        } catch (error) {
            return {error: error.errors}
        }
    }
}

module.exports = new UserRepository()