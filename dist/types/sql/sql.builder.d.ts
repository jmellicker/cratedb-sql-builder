import { GetRequest, InsertRequest, DeleteRequest, UpdateRequest, CreateTableRequest, AlterTableRequest, DropTableRequest, ArrayFieldPushRequest, ArrayFieldDeleteRequest } from './Request';
export declare const sqlBuilder: {
    get(request: GetRequest): string;
    insert(request: InsertRequest): string;
    update(request: UpdateRequest): string;
    deleteRow: (request: DeleteRequest) => string;
    arrayFieldPush: (request: ArrayFieldPushRequest) => string;
    arrayFieldDelete: (request: ArrayFieldDeleteRequest) => string;
    createTable: (request: CreateTableRequest) => string;
    alterTable: (request: AlterTableRequest) => string;
    dropTable: (request: DropTableRequest) => string;
};
