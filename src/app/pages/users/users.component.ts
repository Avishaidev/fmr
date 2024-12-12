import { ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { AppStore } from '../../store/app.store';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { NzInputDirective } from "ng-zorro-antd/input";
import { FormsModule } from "@angular/forms";
import { NzPopconfirmDirective } from "ng-zorro-antd/popconfirm";
import { User } from "../../app.interface";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { UserOrdersComponent } from "./user-orders/user-orders.component";

@Component({
  standalone: true,
  selector: 'app-page-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NzTableComponent,
    NzInputDirective,
    FormsModule,
    NzPopconfirmDirective,
    NzButtonComponent,
    UserOrdersComponent
  ],
})
export class UsersPageComponent implements OnInit {
  readonly appStore = inject(AppStore);
  editUserId: number | null = null;
  showAddUserRow = false;
  newUserDetails = {
    id: 0,
    name: ''
  }

  ngOnInit() {
    this.appStore.initialize();
  }

  setCellEditMode(userId: number, cellElement: HTMLInputElement) {
    this.editUserId = userId;

    setTimeout(() => {
      cellElement.focus();
      cellElement.select();
    }, 200);
  }

  showAddUser() {
    const users = this.appStore.userEntities();
    this.newUserDetails.id = Math.max(...users.map(user => user.id)) + 1;
    this.showAddUserRow = true;
  }

  cancelNewUser() {
    this.showAddUserRow = false;
    this.newUserDetails = {
      id: 0,
      name: ''
    }
  }

  saveNewUser() {
    this.appStore.addUpdateUser(this.newUserDetails);
    this.showAddUserRow = false;
    this.newUserDetails = {
      id: 0,
      name: ''
    }
  }

  updateUser(user: User, nameInput: HTMLInputElement) {
    if (user.name.trim() === '') {
      nameInput.focus();
      return;
    }

    this.appStore.addUpdateUser(user);
    this.editUserId = null
  }

  deleteUser(userId: number) {
    this.appStore.removeUser(userId);
    this.editUserId = null;
  }
}
