
const theFunctions = require('./functions')

test('simple query', () => {
    expect (theFunctions.op.action({
        method: 'get',
        table: 'users',
        where: `id = 'qqq'`

    })).toBe(`SELECT * FROM users WHERE id = 'qqq'`)
})

test('specifying fields', () => {
    expect (theFunctions.op.action({
        method: 'get',
        table: 'users',
        fields: ['id', 'first_name', 'email'],
        where: `id = 'qqq'`

    })).toBe(`SELECT id,first_name,email FROM users WHERE id = 'qqq'`)
})

