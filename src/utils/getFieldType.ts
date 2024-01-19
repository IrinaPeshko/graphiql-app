import { IType } from '@/types/general';

export function getFieldType(type: IType): string | undefined {
  if (type.kind === 'LIST') {
    if (type.ofType) {
      return `[${getFieldType(type.ofType)}]`;
    } else {
      return 'Unknown';
    }
  } else if (type.kind === 'NON_NULL') {
    if (type.ofType) {
      return `${getFieldType(type.ofType)}!`;
    } else {
      return 'Unknown';
    }
  } else {
    return type.name;
  }
}
