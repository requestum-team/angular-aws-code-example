import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type StorageKey = 'role';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _shouldUseLocalstorage$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  set shouldUseLocalstorage(value: boolean) {
    this._shouldUseLocalstorage$.next(value);
  }

  get current(): Storage {
    const alreadyUsedStorage: Storage = [sessionStorage, localStorage].find((storage: Storage): string => storage.getItem('role'));
    const newStorage: Storage = this._shouldUseLocalstorage$.value ? localStorage : sessionStorage;

    return alreadyUsedStorage || newStorage;
  }

  get<T>(key: StorageKey): T {
    const currentStorage: Storage = [sessionStorage, localStorage].find((storage: Storage): boolean => Boolean(storage.getItem(key)));
    try {
      return currentStorage?.getItem(key) ? JSON.parse(currentStorage?.getItem(key)) : null;
    } catch (err: any) {
      try {
        return currentStorage?.getItem(key) ? (currentStorage?.getItem(key) as unknown as T) : null;
      } catch (err: any) {
        currentStorage.clear();
      }
    }
  }

  set(name: StorageKey, value: any): void {
    this.current.setItem(name, JSON.stringify(value ?? ''));
  }

  remove(key: string): void {
    [sessionStorage, localStorage].forEach((storage: Storage): void => {
      storage.removeItem(key);
    });
  }

  clear(): void {
    [sessionStorage, localStorage].forEach((storage: Storage): void => storage.clear());
  }
}
