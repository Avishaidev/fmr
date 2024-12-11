import { ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { UsersStore } from '../../store/user.store';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { UserService } from './user.service';

@Component({
  standalone: true,
  selector: 'app-page-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NzTableComponent
  ],
  providers: [
    UsersStore,
    UserService
  ]
})
export class UsersPageComponent implements OnInit {
  readonly usersStore = inject(UsersStore);

  ngOnInit() {
    this.usersStore.initialize();
  }
}
