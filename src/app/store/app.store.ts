import { getState, patchState, signalStore, type, withHooks, withMethods, withState } from '@ngrx/signals';
import { effect, inject } from '@angular/core';
import { entityConfig, removeEntity, setAllEntities, setEntity, withEntities } from '@ngrx/signals/entities';
import { Order, User } from '../app.interface';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, of, switchMap, tap } from 'rxjs';
import { UserService } from '../pages/users/user.service';

const userEntityConfig = entityConfig({
    entity: type<User>(),
    collection: 'user',
    selectId: (user: User) => user.id,
});
interface selectedUserIdState {
    selectedUserId: number | null;
}
const selectedUserIdInitialState: selectedUserIdState = {
    selectedUserId: null
}

const orderEntityConfig = entityConfig({
    entity: type<Order>(),
    collection: 'order',
    selectId: (order: Order) => order.id
});
const mockOrders: Order[] = [
    {
        id: 1,
        userId: 1,
        total: 12
    },
    {
        id: 2,
        userId: 2,
        total: 18
    },
    {
        id: 3,
        userId: 3,
        total: 34
    },
    {
        id: 4,
        userId: 4,
        total: 65
    },
    {
        id: 5,
        userId: 5,
        total: 3
    },
    {
        id: 6,
        userId: 6,
        total: 40
    },
];

export const AppStore = signalStore(
    { providedIn: 'root' },
    withEntities(userEntityConfig),
    withEntities(orderEntityConfig),
    withState(selectedUserIdInitialState),

    withHooks({
        onInit(store) {
            patchState(store, setAllEntities(mockOrders, orderEntityConfig));
            effect(() => {
                const state = getState(store);
                console.log(`state`, state);
            });
        }
    }),

    withMethods((store, userService = inject(UserService)) => ({
        initialize: rxMethod<void>(() => {
            return userService.getUsers().pipe(
                map(users => {
                    return patchState(store, setAllEntities(users, userEntityConfig));
                })
            );
        }),

        addUpdateUser(user: User): void {
            patchState(store, setEntity(user, userEntityConfig));
        },

        removeUser(userId: number): void {
            patchState(store, removeEntity(userId, userEntityConfig));

            if (getState(store).selectedUserId === userId) {
                this.selectUser(null);
            }
        },

        selectUser: rxMethod<number | null>(
            switchMap((userId: number | null) => {
                patchState(store, { selectedUserId: userId });
                if (userId === null) {
                    return of();
                }

                return userService.getUserInfo().pipe(tap(() => {
                    console.log('User info fetched for user id: ', userId);
                }));
            })
        ),

        getSelectedUserOrderTotal(): number {
            const selectedUserId = getState(store).selectedUserId;
            if (selectedUserId === null) {
                return 0;
            }

            const userOrder = store.orderEntities().find(order => order.userId === selectedUserId);
            return userOrder?.total || 0;
        },

        getSelectedUserName(): string {
            const selectedUserId = getState(store).selectedUserId;
            if (selectedUserId === null) {
                return '';
            }

            return getState(store).userEntityMap[selectedUserId].name;
        }

    })),
);
