const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate: {
            validator: async function (email) {
                const user = await this.constructor.findOne({email})
                if(user) {
                    if(this.id === user.id) {
                        return true
                    }
                    return false
                }
                return true
            },
            message: props => 'The specified email address is already in use.'
        },
        required: true,
    },
    password: {
        type: String,
        required: true
    },
})

const User = mongoose.model('User', schema)

module.exports = User