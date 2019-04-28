
const crateSQLBuilder = require('./crateSQLBuilder')

test('get simple query', () => {
    expect (crateSQLBuilder.req.action({
        method: 'get',
        table: 'friends',
        where: `id = 'aaa'`
    })).toBe(`SELECT * FROM friends WHERE id = 'aaa';`)
})

test('get specifying fields', () => {
    expect (crateSQLBuilder.req.action({
        method: 'get',
        table: 'friends',
        fields: ['id', 'first_name', 'email'],
        where: `id = 'aaa'`
    })).toBe(`SELECT id,first_name,email FROM friends WHERE id = 'aaa';`)
})

test('insert no ID', () => {
    expect (crateSQLBuilder.req.action({
        method: 'insert',
        table: 'friends',
        doc: {
            first_name: 'Ava',
            user_email: 'a@a.com'
        }
    })).toContain(`INSERT INTO friends (first_name,user_email,id) VALUES ('Ava','a@a.com',`)
})

test('insert with ID', () => {
    expect (crateSQLBuilder.req.action({
        method: 'insert',
        table: 'friends',
        doc: {
            id: 'bbb',
            first_name: 'Bob',
            user_email: 'b@b.com'
        }
    })).toBe(`INSERT INTO friends (id,first_name,user_email) VALUES ('bbb','Bob','b@b.com');`)
})

test('insert with object array, single element', () => {
    expect (crateSQLBuilder.req.action({
        method: 'insert',
        table: 'friends',
        doc: {
            id: 'ccc',
            first_name: 'Cat',
            user_email: 'c@c.com',
            favorite_foods: [{ lunch: 'sandwich' }]
        }

    })).toBe(`INSERT INTO friends (id,first_name,user_email,favorite_foods) VALUES ('ccc','Cat','c@c.com',[{lunch='sandwich'}]);`)
})

test('insert with object array, multiple keys', () => {
    expect (crateSQLBuilder.req.action({
        method: 'insert',
        table: 'friends',
        doc: {
            id: 'ddd',
            first_name: 'Dog',
            user_email: 'd@d.com',
            favorite_foods: [{
                lunch: 'sandwich',
                dinner: 'sushi'
            }]
        }

    })).toBe(`INSERT INTO friends (id,first_name,user_email,favorite_foods) VALUES ('ddd','Dog','d@d.com',[{lunch='sandwich',dinner='sushi'}]);`)
})
test('insert with object array, multiple elements', () => {
    expect (crateSQLBuilder.req.action({
        method: 'insert',
        table: 'friends',
        doc: {
            id: 'ddd',
            first_name: 'Dog',
            user_email: 'd@d.com',
            favorite_foods: [{
                lunch: 'sandwich',
            }, {
                dinner: 'sushi'
            }]
        }

    })).toBe(`INSERT INTO friends (id,first_name,user_email,favorite_foods) VALUES ('ddd','Dog','d@d.com',[{lunch='sandwich'},{dinner='sushi'}]);`)
})

test('insert with object', () => {
    expect (crateSQLBuilder.req.action({
        method: 'insert',
        table: 'friends',
        doc: {
            id: 'eee',
            first_name: 'Eagle',
            user_email: 'e@e.com',
            favorite_animals: {
                land: 'raptor',
                sea: 'whale'
            }
        }
    })).toBe(`INSERT INTO friends (id,first_name,user_email,favorite_animals) VALUES ('eee','Eagle','e@e.com',{land='raptor',sea='whale'})`)
})

// not working
// test('insert with object and object array, multiple elements', () => {
//     expect (crateSQLBuilder.req.action({
//         method: 'insert',
//         table: 'friends',
//         doc: {
//             id: 'fff',
//             first_name: 'Fox',
//             user_email: 'f@f.com',
//             favorite_animals: {
//                 land: 'raptor',
//                 sea: 'whale'
//             },
//             favorite_foods: [{
//                 lunch: 'pizza',
//                 dinner: 'burgers'
//             }]
//         }
//     })).toBe(`INSERT INTO friends (id,first_name,user_email,favorite_foods,favorite_animals) VALUES ('fff','Fox','f@f.com',[{lunch='pizza'}, {dinner='burgers'}],{land='raptor',sea='whale'})`)
// })


// test('simple update', () => {
//     expect (crateSQLBuilder.req.action({
//         method: 'update',
//         table: 'friends',
//         id: 'xyz',
//         doc: {
//             first_name: 'Robert',
//             user_email: 'bob@b.com'
//         }
//     })).toBe(`UPDATE friends SET first_name='Robert',user_email='bob@b.com' WHERE id = 'xyz'`)
// })

// test('update with array', () => {
//     expect (crateSQLBuilder.req.action({
//         method: 'addToArray',
//         table: 'friends',
//         id: 'ccc',
//         doc: {
//             favorite_foods: {
//                 push: 'waffles'
//             }
//         }
//         operation: () => {
//             favorite_foods.push({
//                 breakfast: 'waffles'
//             })
//         }
//     })).toBe(`UPDATE friends SET favorite_foods = array_cat(favorite_foods, [{ breakfast = 'waffles' }]) WHERE id = 'ccc';`)
// })

 
