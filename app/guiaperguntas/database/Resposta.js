const Sequelize = require("sequelize")
const database = require("./database")

const Resposta = database.define('respostas',{
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Resposta.sync({force: false})

module.exports = Resposta