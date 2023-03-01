class Table {
    constructor (dados) {
        this.header = dados[0]
        dados.shift()
        this.rows = dados
    }

    get RowCount() {
        return this.rows.length
    }

    get ColumnCount() {
        return this.header.length
    }
}

module.exports = Table