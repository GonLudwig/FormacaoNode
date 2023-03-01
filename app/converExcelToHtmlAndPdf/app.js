const Reader = require("./Reader")
const Writer = require("./Writer")
const WriterPdf = require("./WriterPdf")
const Processor =  require("./Processor")
const Table = require("./Table")
const HtmlParser = require("./HtmlParser")

let leitor = new Reader()
let escritor = new Writer()

async function main() {
    let dados = await leitor.Read("./users.csv")
    let table = Processor.Process(dados)
    let usuarios = new Table(table)
    let html = await HtmlParser.Parse(usuarios)

    WriterPdf.writer(Date.now() + ".PDF", html)
    escritor.Write(Date.now() + ".html", html)
}

main()