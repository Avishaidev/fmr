import { getState, patchState, signalStore, signalStoreFeature, type, withHooks, withMethods } from '@ngrx/signals';
import { effect, inject } from '@angular/core';
import { entityConfig, removeEntity, setAllEntities, setEntity, withEntities } from '@ngrx/signals/entities';
import { User } from '../app.interface';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { distinctUntilChanged, map, pipe, switchMap } from 'rxjs';
import { UserService } from '../pages/users/user.service';

const userConfig = entityConfig({
  entity: type<User>(),
  collection: 'user',
  selectId: (user: User) => user.id
});

export function withLogger(name: string) {
  return signalStoreFeature(
    withHooks({
      onInit(store) {
        effect(() => {
          const state = getState(store);
          console.log(`${name} state`, state);
        });
      },
    })
  );
}

export const UsersStore = signalStore(
  withEntities(userConfig),

  withMethods((store, userService = inject(UserService)) => ({
    initialize: rxMethod<void>(pipe(
        distinctUntilChanged(),
        switchMap(() => {
          return userService.getUsers().pipe(
            map(users => {
              return patchState(store, setAllEntities(users, userConfig));
            })
          );
        })
      )
    ),

    addUpdateUser(user: User): void {
      patchState(store, setEntity(user, userConfig));
    },

    removeUser(userId: number): void {
      patchState(store, removeEntity(userId, userConfig));
    },

  })),

  withLogger('Users')
);
