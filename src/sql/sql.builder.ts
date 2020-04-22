import { quoteIfString, addAdditionalSingleQuoteIfString } from '../utils/string.utils'
import {
  GetRequest,
  InsertRequest,
  DeleteRequest,
  UpdateRequest,
  CreateTableRequest,
  AlterTableRequest,
  DropTableRequest,
} from './Request'

// TODO: refactor. It's too hard to understand what it does
function createInsertSyntax (data: Record<string, string>[] | Record<string, string> | string): string {
  let res;

  if (Array.isArray(data)) {
    const var1 = data.map(
      (obj) => {
        const mapped = Object.keys(obj).map(
          (k) => {
            const value = obj[k]
            const quotedValue = quoteIfString(addAdditionalSingleQuoteIfString(value))
            return `${k}=${quotedValue}`
          }
        ).join()

        return `{${mapped}}`
      }
    ).join()
    return `[${var1}]`;
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

export const sqlBuilder = {
  get (request: GetRequest) {
    let sql = `SELECT ${request.fields || '*'} FROM ${request.table}`;
    if (request.where) sql += ` WHERE ${request.where}`;
    return sql;
  },
  insert (request: InsertRequest) {
    const insertMap = (Object.keys(request.doc) as (keyof typeof request.doc)[])
      .map(
        (key) => ({
          key,
          value: createInsertSyntax(request.doc[key]),
        })
      );

    return `INSERT INTO ${request.table}
      (${insertMap.map((e) => e.key).join()})
      VALUES (${insertMap.map((e) => e.value).join()})
    `;
  },
  update (request: UpdateRequest) {
    const theValues = [];

    for (const prop of Object.keys(request.doc) as (keyof typeof request.doc)[]) {
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

  deleteRow: (request: DeleteRequest) => `DELETE FROM ${request.table} WHERE id = '${request.id}'`,

  arrayFieldPush: (request: UpdateRequest) => `
      UPDATE ${request.table}
      SET ${request.doc.columnName} =
      array_cat(${request.doc.columnName}, ${request.doc.value})
      WHERE id = '${request.id}'
    `,

  arrayFieldDelete: (request: UpdateRequest) => `
      UPDATE ${request.table}
      SET ${request.doc.columnName} =
      array_difference(${request.doc.columnName}, ${request.doc.value})
      WHERE id = '${request.id}'
    `,

  createTable: (request: CreateTableRequest) => {
    const append = Object.keys(request.fields).map((fieldName) => {
      if (fieldName === 'primaryKey') {
        return `primary key (${request.fields[fieldName]})`;
      }
      return `${fieldName} ${request.fields[fieldName]}`;
    }).join(',\n')

    return `create table ${request.table} (${append})`
  },

  alterTable: (request: AlterTableRequest) => `ALTER TABLE ${request.table} ADD COLUMN ${request.newField.fieldName} ${request.newField.fieldType}`,

  dropTable: (request: DropTableRequest) => `DROP TABLE IF EXISTS ${request.table}`,
};
