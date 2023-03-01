const pdf = require("html-pdf")

class WriterPdf {
    static writer(filename, html) {
        pdf.create(html,{}).toFile(filename, (error) => {})
    }
}

module.exports = WriterPdf