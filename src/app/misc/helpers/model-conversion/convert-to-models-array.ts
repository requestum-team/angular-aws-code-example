import { ClassConstructor, plainToInstance } from 'class-transformer';

export function convertToModelsArray<T>(values: any[], ModelClass: ClassConstructor<T>): T[] {
  return values?.map((value: any): T => plainToInstance(ModelClass, value) as unknown as T);
}
