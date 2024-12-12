import { Injectable } from '@angular/core';
import { User } from '../../app.interface';
import { delay, Observable, of, pipe, tap } from 'rxjs';

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

  getUsers(): Observable<User[]> {
    return of(this.mockUsers);
  }

  getUserInfo() {
    return of(pipe(tap())).pipe(delay(3000));
  }
}
