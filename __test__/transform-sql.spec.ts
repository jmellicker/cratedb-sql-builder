import * as crateSQLBuilder from '../src';

describe('checking if sql keys are correctly transformed', () => {
  it('transforms keys on insert', () => {
    expect(crateSQLBuilder.buildSQL({
      method: 'insert',
      table: 'friends',
      doc: {
        id: 'bbb',
        firstName: 'Bob',
        userEmail: 'b@b.com',
      },
    })).toBe("INSERT INTO friends (id,first_name,user_email) VALUES ('bbb','Bob','b@b.com');");
  })

  it('transforms keys on update', () => {
    expect(crateSQLBuilder.buildSQL({
      method: 'update',
      table: 'friends',
      id: 'xyz',
      doc: {
        firstName: 'Robert',
        userEmail: 'bob@b.com',
      },
    })).toBe("UPDATE friends SET first_name='Robert',user_email='bob@b.com' WHERE id = 'xyz';");
  })
})
