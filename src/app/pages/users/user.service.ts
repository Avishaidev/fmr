import { Injectable } from '@angular/core';
import { Order, User } from '../../app.interface';
import { Observable, of } from 'rxjs';

@Injectable()
export class UserService {
  mockUsers: User[] = [
    {
      id: 1,
      name: "user 1"
    },
    {
      id: 2,
      name: "user 2"
    },
    {
      id: 3,
      name: "user 3"
    },
    {
      id: 4,
      name: "user 4"
    },
    {
      id: 5,
      name: "user 5"
    },
    {
      id: 6,
      name: "user 6"
    }
  ];
  mockOrders: Order[] = [
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


  getUsers(): Observable<User[]> {
    return of(this.mockUsers);
  }

  getOrders(): Observable<Order[]> {

    return of(this.mockOrders);
  }
}
