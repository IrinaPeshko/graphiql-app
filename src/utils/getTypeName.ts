import { IType } from '@/types/general';

export const getTypeName = (type: IType): string | undefined => {
  if (type?.name) {
    return type.name;
  }
  if (type?.ofType) {
    return getTypeName(type.ofType);
  }
  return undefined;
};
