export interface GetRequest {
  method: 'get';
  fields?: string | string[];
  table: string;
  where?: string;
}

export interface InsertRequest {
  method: 'insert';
  doc: Record<string, any>;
  table: string;
}

export interface DeleteRequest {
  method: 'deleteRow';
  id: number | string;
  table: string;
}

export interface ArrayFieldDeleteRequest {
  method: 'arrayFieldDelete';
  id: number | string;
  table: string;
  doc: {
    columnName: string;
    value: number | string;
  };
}

export interface ArrayFieldPushRequest {
  method: 'arrayFieldPush';
  id: number | string;
  table: string;
  doc: {
    columnName: string;
    value: number | string;
  };
}

export interface UpdateRequest {
  method: 'update';
  id: number | string;
  doc: Record<string, any>;
  table: string;
}

export interface CreateTableRequest {
  method: 'createTable';
  table: string;
  fields: Record<string, string>;
}

export interface AlterTableRequest {
  method: 'alterTable';
  table: string;
  newField: {
    fieldName: string;
    // TODO: narrow down fieldTypes
    fieldType: string;
  };
}

export interface DropTableRequest {
  method: 'dropTable';
  table: string;
}

export type Request =
  InsertRequest |
  GetRequest |
  UpdateRequest |
  DeleteRequest |
  CreateTableRequest |
  AlterTableRequest |
  DropTableRequest |
  ArrayFieldPushRequest |
  ArrayFieldDeleteRequest

export type TransformKeysRequest =
  InsertRequest |
  UpdateRequest
