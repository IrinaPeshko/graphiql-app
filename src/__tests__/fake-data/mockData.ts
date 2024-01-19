import { IDataItem } from '@/types/general';
import { ISchemaType, IType } from '@/types/general';

export const mockTypes: ISchemaType[] = [
  {
    kind: 'OBJECT',
    name: 'Query',
    fields: [
      { name: 'field1', type: { kind: 'SCALAR', name: 'String' } as IType },
      { name: 'field2', type: { kind: 'SCALAR', name: 'Int' } as IType },
    ],
    args: [],
    inputFields: [],
    enumValues: [],
    description: null,
  },
  {
    kind: 'SCALAR',
    name: 'String',
    fields: [
      { name: 'field1', type: { kind: 'SCALAR', name: 'String' } as IType },
      { name: 'field2', type: { kind: 'SCALAR', name: 'Int' } as IType },
    ],
    args: [],
    inputFields: [],
    enumValues: [],
    description: 'This is a description',
  },
];

export const mockData: IDataItem[] = [
  { name: 'field1', type: { kind: 'SCALAR', name: 'String' } },
  { name: 'field2', type: { kind: 'SCALAR', name: 'Int' } },
];
