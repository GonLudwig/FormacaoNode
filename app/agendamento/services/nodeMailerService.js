const nodemailer = require('nodemailer')
const {config} = require('../config/config')

const transporter = nodemailer.createTransport({
    host: config.mailHost,
    port: config.port,
    auth: {
      user: config.user,
      pass: config.pass
    }
});

module.exports = transporter