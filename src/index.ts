import { sqlBuilder } from './sql/sql.builder';
import { Request } from './sql/Request';

export default {
  buildSQL<T extends Request> (request: T) {
    const caller = sqlBuilder[request.method] as (arg: T) => string
    return `${caller(request).replace(/\s\s+/g, ' ').trim()};`;
  },
  sqlBuilder
};
