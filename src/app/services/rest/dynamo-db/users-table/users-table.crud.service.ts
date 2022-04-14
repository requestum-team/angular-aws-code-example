import { Inject, Injectable } from '@angular/core';
import { ClassConstructor } from 'class-transformer';
import { User } from '@models/classes/user.model';
import { BehaviorSubject, from, mergeMap, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserRole } from '@models/enums/user-role.enum';
import { StorageService } from '@app/storage/storage.service';
import { me } from '@misc/mock-data/api/users';

@Injectable({
  providedIn: 'root'
})
export class UsersTableCrudService {
  private _me$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private _role$: BehaviorSubject<UserRole> = new BehaviorSubject<UserRole>(this._storage.get('role'));
  protected MODEL: ClassConstructor<User> = User;

  constructor(private _storage: StorageService) {}

  get myRole(): UserRole {
    return this._role$.value;
  }

  get me(): User {
    return this._me$.value;
  }

  getMe(): Observable<User> {
    return of(me).pipe(
      tap((user: User): void => this._me$.next(user)),
      tap((user: User): void => {
        this._role$.next(user?.role);
        this._storage.set('role', user.role);
      })
    );
  }
}
