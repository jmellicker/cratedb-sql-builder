import { quoteIfString, addAdditionalSingleQuoteIfString } from '../utils/string.utils'

export default {
  get (request) {
    let sql = `SELECT ${request.fields || '*'} FROM ${request.table}`;
    if (request.where) sql += ` WHERE ${request.where}`;
    return sql;
  },
  insert (request) {
    const insertMap = Object.keys(request.doc).map((k) => ({
      key: k,
      value: createInsertSyntax(request.doc[k]),
    }));

    return `INSERT INTO ${request.table}
      (${insertMap.map((e) => e.key).join()})
      VALUES (${insertMap.map((e) => e.value).join()})
    `;
  },
  update (request) {
    const theValues = [];

    for (const prop of Object.keys(request.doc)) {
      if (typeof request.doc[prop] !== 'object') {
        theValues.push(`${prop}=${quoteIfString(addAdditionalSingleQuoteIfString(request.doc[prop]))}`);
      } else {
        for (const key of Object.keys(request.doc[prop])) {
          theValues.push(`${prop}['${key}']=${quoteIfString(addAdditionalSingleQuoteIfString(request.doc[prop][key]))}`);
        }
      }
    }

    return `
      UPDATE ${request.table}
      SET ${theValues.join()}
      WHERE id = '${request.id}'
    `;
  },

  deleteRow: (request) => `DELETE FROM ${request.table} WHERE id = '${request.id}'`,

  arrayFieldPush: (request) => `
      UPDATE ${request.table}
      SET ${request.doc.columnName} =
      array_cat(${request.doc.columnName}, ${request.doc.value})
      WHERE id = '${request.id}'
    `,

  arrayFieldDelete: (request) => `
      UPDATE ${request.table}
      SET ${request.doc.columnName} =
      array_difference(${request.doc.columnName}, ${request.doc.value})
      WHERE id = '${request.id}'
    `,

  createTable: (request) => `create table ${request.table} (
            ${Object.keys(request.fields).map((fieldName) => {
    // c.g(fieldName)
    if (fieldName === 'primaryKey') {
      return `primary key (${request.fields[fieldName]})`;
    }
    return `${fieldName} ${request.fields[fieldName]}`;
  }).join(',\n')}
        )`,

  alterTable: (request) => `ALTER TABLE ${request.table} ADD COLUMN ${request.newField.fieldName} ${request.newField.fieldType}`,

  dropTable: (request) => `DROP TABLE IF EXISTS ${request.table}`,
};

function createInsertSyntax (data) {
  let res;

  if (Array.isArray(data)) {
    return `[${data.map((e) => `{${Object.keys(e).map((k) => `${k}=${quoteIfString(addAdditionalSingleQuoteIfString(e[k]))}`).join()}}`).join()}]`;
  }

  if (typeof data === 'object') {
    return `{${Object.keys(data).map((k) => {
      res = addAdditionalSingleQuoteIfString(data[k]); // this is how Crate escapes a single quote... with two single quotes in a row (in case there is a single quote in the value)
      res = quoteIfString(res); // add single quotes if a string
      return `${k}=${res}`;
    }).join()}}`;
  }

  return quoteIfString(addAdditionalSingleQuoteIfString(data));
}
