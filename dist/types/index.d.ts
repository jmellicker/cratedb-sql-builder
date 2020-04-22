import { sqlBuilder } from './sql/sql.builder';
import { Request } from './sql/Request';
export declare function buildSQL<T extends Request>(request: T, { transformKeys }?: {
    transformKeys?: boolean | undefined;
}): string;
export { sqlBuilder };
