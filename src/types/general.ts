export interface IWelcomeProps {
  name: string;
  description: string;
  uniqueKey: number;
}

export interface IField {
  name: string;
  type: string;
}
export interface IType {
  name?: string;
  ofType?: IType;
  kind: string;
}
export interface IDataItem {
  name: string;
  type: IType | undefined;
  args?: IDataItem[];
  fields?: IDataItem[];
}

export interface ISchemaType {
  args: IDataItem[];
  name: string;
  kind: string;
  fields: IDataItem[];
  inputFields: IDataItem[];
  enumValues: IDataItem[];
  description: string | null;
}

export interface IRequest {
  url: string;
  query: string;
  variables?: string;
  headers?: string;
}
