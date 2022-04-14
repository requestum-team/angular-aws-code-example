import { ClassConstructor, plainToInstance, TransformFnParams } from 'class-transformer';

export function convertToModel<T>(value: any, ModelClass: ClassConstructor<T>): T {
  if (value && typeof value === 'object') {
    return plainToInstance(ModelClass, value) as unknown as T;
  } else {
    return value;
  }
}

export function transformToModel<T>(ModelClass: ClassConstructor<T>): (params: TransformFnParams) => T {
  return ({ value }: TransformFnParams) => {
    return value && typeof value === 'object' ? plainToInstance(ModelClass, value) : value;
  };
}
