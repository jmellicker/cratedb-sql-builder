module.exports = {
    op: {
        description: "accepts a request object, executes and returns a result",
        action: (request) => {
            let table = request.table
            let sql
            switch (request.method) {
                case 'get':
                    sql = `SELECT ${ request.fields || '*' } FROM ${ table }`
                    if (request.where) sql += ` WHERE ${ request.where }`
                    break
            
                default:
                    break
            }
            console.log(sql)
            return sql
            
        }
    }
}