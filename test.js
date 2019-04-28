
const crateSQLBuilder = require('./index')

test('get simple query', () => {
    expect (crateSQLBuilder.buildSQL({
        method: 'get',
        table: 'friends',
        where: `id = 'aaa'`
    })).toBe(`SELECT * FROM friends WHERE id = 'aaa';`)
})

test('get specifying fields', () => {
    expect (crateSQLBuilder.buildSQL({
        method: 'get',
        table: 'friends',
        fields: ['id', 'first_name', 'email'],
        where: `id = 'aaa'`
    })).toBe(`SELECT id,first_name,email FROM friends WHERE id = 'aaa';`)
})

test('insert with ID', () => {
    expect (crateSQLBuilder.buildSQL({
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
    expect (crateSQLBuilder.buildSQL({
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
    expect (crateSQLBuilder.buildSQL({
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
    expect (crateSQLBuilder.buildSQL({
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
    expect (crateSQLBuilder.buildSQL({
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
    })).toBe(`INSERT INTO friends (id,first_name,user_email,favorite_animals) VALUES ('eee','Eagle','e@e.com',{land='raptor',sea='whale'});`)
})

test('insert with object and object array, multiple elements', () => {
    expect (crateSQLBuilder.buildSQL({
        method: 'insert',
        table: 'friends',
        doc: {
            id: 'fff',
            first_name: 'Fox',
            user_email: 'f@f.com',
            favorite_animals: {
                land: 'raptor',
                sea: 'whale'
            },
            favorite_foods: [{
                lunch: 'pizza',
                dinner: 'burgers'
            }]
        }
    })).toBe(`INSERT INTO friends (id,first_name,user_email,favorite_animals,favorite_foods) VALUES ('fff','Fox','f@f.com',{land='raptor',sea='whale'},[{lunch='pizza',dinner='burgers'}]);`)
})

test('simple update', () => {
    expect (crateSQLBuilder.buildSQL({
        method: 'update',
        table: 'friends',
        id: 'xyz',
        doc: {
            first_name: 'Robert',
            user_email: 'bob@b.com'
        }
    })).toBe(`UPDATE friends SET first_name='Robert',user_email='bob@b.com' WHERE id = 'xyz';`)
})

test('update with array', () => {
    expect (crateSQLBuilder.buildSQL({
        method: 'arrayPush',
        table: 'friends',
        id: 'ccc',
        doc: {
            columnName: 'favorite_foods',
            value: `[{dinner = 'dogfood'}]`
        }
    })).toBe(`UPDATE friends SET favorite_foods = array_cat(favorite_foods, [{dinner = 'dogfood'}]) WHERE id = 'ccc';`)
})

test('alter table', () => {
    expect (crateSQLBuilder.buildSQL({
        environmentID: 'teamcode',
        method: 'alterTable',
        table: 'friends',
        op: 'addField',
        newField: {
            fieldName: 'hair',
            fieldType: 'boolean'
        }
    })).toBe(`ALTER TABLE friends ADD COLUMN hair boolean;`)
})

 
