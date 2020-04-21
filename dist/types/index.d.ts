import { Request } from './sql/Request';
declare const _default: {
    buildSQL<T extends Request>(request: T): string;
    sqlBuilder: {
        get(request: import("./sql/Request").GetRequest): string;
        insert(request: import("./sql/Request").InsertRequest): string;
        update(request: import("./sql/Request").UpdateRequest): string;
        deleteRow: (request: import("./sql/Request").DeleteRequest) => string;
        arrayFieldPush: (request: import("./sql/Request").UpdateRequest) => string;
        arrayFieldDelete: (request: import("./sql/Request").UpdateRequest) => string;
        createTable: (request: import("./sql/Request").CreateTableRequest) => string;
        alterTable: (request: import("./sql/Request").AlterTableRequest) => string;
        dropTable: (request: import("./sql/Request").DropTableRequest) => string;
    };
};
export default _default;
