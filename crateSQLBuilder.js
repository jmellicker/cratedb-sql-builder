const j_ = require('@jmellicker/j_')
const c = require('./logs')

module.exports = {
    req: {
        description: "accepts a request object, executes and returns a result",
        action: (request) => {
            let sql = sqlBuilder[request.method](request)
            sql = sql.replace(/\s\s+/g, ' ').trimRight() + ';'
            return sql
        }
    }
}

sqlBuilder = {

    // ---------------- get  ---------------- //

    get: (request) => {
        sql = `SELECT ${ request.fields || '*' } FROM ${ request.table }`
        if (request.where) sql += ` WHERE ${ request.where }`
        return sql
    },

    // ---------------- insert ---------------- //

    insert: (request) => {
        if (!request.doc.id) request.doc.id = j_.uaid('id')

        let insertMap = Object.keys(request.doc).map(k => {
            return {
                key: k,
                value: createInsertSyntax(request.doc[k])
            }
        })

        return `INSERT INTO ${ request.table }
            (${ insertMap.map(e => { return e.key }).join() })
            VALUES (${ insertMap.map(e => { return e.value }).join() })
        `
    },

    // ---------------- update ---------------- //

    update: (request) => {
        columns = Object.keys(request.doc)
        let theValues = []

        for (let prop in request.doc) {
            if (typeof request.doc[prop] !== 'object') {
                theValues.push(prop + '=' + j_.quoteIfString(j_.addAdditionalSingleQuoteIfString(request.doc[prop])))
            }
            else {
                for (let key in request.doc[prop]) {
                    theValues.push(`${ prop }['${ key }']=${ j_.quoteIfString(j_.addAdditionalSingleQuoteIfString(request.doc[prop][key])) }`)
                }
            }
        }

        return `
            UPDATE ${ request.table }
            SET ${ theValues.join() }
            WHERE id = '${ request.id }'
        `
    },

    // ---------------- deleteRow ---------------- //

    deleteRow: (request) => {
        return `DELETE FROM ${ request.table } WHERE id = '${ request.id }'`
    },

    // ---------------- arrayPush ---------------- //

    arrayPush: (request) => {
        return `
            UPDATE ${ request.table }
            SET ${ request.doc.columnName } =
            array_cat(${ request.doc.columnName }, ${ request.doc.value })
            WHERE id = '${ request.id }'
        `
    },

    // ---------------- createTable ---------------- //

    createTable: (request) => {
        return `create table ${ request.table } (
            ${ Object.keys(request.fields).map(fieldName => {
                // c.g(fieldName)
                if (fieldName === 'primaryKey') {
                    return 'primary key (' +  request.fields[fieldName] + ')'
                } else {
                    return fieldName + ' ' + request.fields[fieldName]
                }
            }).join(',\n') }
        )`

    },

    // ---------------- alterTable ---------------- //

    alterTable: (request) => {
        return `ALTER TABLE ${ table} ADD COLUMN ${ request.newField.fieldName } ${ request.newField.fieldType }`

    },

    // ---------------- dropTable ---------------- //

    dropTable: (request) => {
        return `DROP TABLE IF EXISTS ${ request.table }`
    }
}

function createInsertSyntax(data) {
    let res, str
    // c.bbh('data')
    // c.b(data)

    switch (true) {
        case Array.isArray(data): // this is not working yet
            return `[${ data.map(e => {
                return `{${ Object.keys(e).map(k => {
                    return `${ k }=${ j_.quoteIfString(j_.addAdditionalSingleQuoteIfString(e[k])) }`
                }).join() }}`
            }).join() }]`
            break

        case typeof data === 'object':
            c.oh('object')
            str = `{${ Object.keys(data).map(k => {
                res = j_.addAdditionalSingleQuoteIfString(data[k]) // this is how Crate escapes a single quote... with two single quotes in a row (in case there is a single quote in the value)
                res = j_.quoteIfString(res) // add single quotes if a string
                return `${ k }=${ res }`
                // return `${ k }=${ j_.quoteIfString(j_.addAdditionalSingleQuoteIfString(data[k])) }` // harder to read this code
            }).join() }}`
            c.o(str)
            return str
            break

        default:
            return j_.quoteIfString(j_.addAdditionalSingleQuoteIfString(data))
    }
}