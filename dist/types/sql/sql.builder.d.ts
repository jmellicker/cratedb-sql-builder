import { GetRequest, InsertRequest, DeleteRequest, UpdateRequest, CreateTableRequest, AlterTableRequest, DropTableRequest } from './Request';
export declare const sqlBuilder: {
    get(request: GetRequest): string;
    insert(request: InsertRequest): string;
    update(request: UpdateRequest): string;
    deleteRow: (request: DeleteRequest) => string;
    arrayFieldPush: (request: UpdateRequest) => string;
    arrayFieldDelete: (request: UpdateRequest) => string;
    createTable: (request: CreateTableRequest) => string;
    alterTable: (request: AlterTableRequest) => string;
    dropTable: (request: DropTableRequest) => string;
};
