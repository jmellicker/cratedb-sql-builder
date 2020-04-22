import { sqlBuilder } from './sql/sql.builder';
import { Request, TransformKeysRequest } from './sql/Request';
import { transformKeysCamelToSnake } from './utils/object.utils';

function isDocRequest (request: Request): request is TransformKeysRequest {
  return ['insert', 'update'].some(str => str === request.method)
}

export default {
  buildSQL<T extends Request> (request: T, { transformKeys = true } = {}) {
    const caller = sqlBuilder[request.method] as (arg: T) => string
    if (transformKeys && isDocRequest(request)) {
      request.doc = transformKeysCamelToSnake(request.doc)
    }
    return `${caller(request).replace(/\s\s+/g, ' ').trim()};`;
  },
  sqlBuilder
};
