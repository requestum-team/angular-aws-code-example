import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassConstructor } from 'class-transformer';
import { convertToModel } from '@misc/helpers/model-conversion/convert-to-model.function';

export function toModelsMap<T>(Model: ClassConstructor<T>): OperatorFunction<{ [key: string]: T }, Map<string, T>> {
  return (input$: Observable<{ [key: string]: T }>): Observable<Map<string, T>> =>
    input$.pipe(
      map((data: { [key: string]: T }): Map<string, T> => {
        return new Map(Object.entries(data).map(([key, value]: [string, T]): [string, T] => [key, convertToModel(value, Model)]));
      })
    );
}
