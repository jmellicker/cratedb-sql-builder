import { sqlBuilder } from './sql/sql.builder';
import { Request } from './sql/Request';

interface BuildOptions {
  useCamelCase?: boolean
}

export default {
  buildSQL<T extends Request> (request: T, { useCamelCase = false }: BuildOptions = {}) {
    const caller = sqlBuilder[request.method] as (arg: T) => string
    return `${caller(request).replace(/\s\s+/g, ' ').trim()};`;
  },
  sqlBuilder
};
