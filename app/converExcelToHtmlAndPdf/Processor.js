class Processor{
    static Process(dados) {
        let table = []
        dados.split("\n").forEach( row => {
            table.push(row.split(","))
        });

        return table
    }
}

module.exports = Processor