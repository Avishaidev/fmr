import { ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { AppStore } from '../../../store/app.store';
import { FormsModule } from "@angular/forms";
import { NzOptionComponent, NzSelectComponent } from "ng-zorro-antd/select";
import { NzDescriptionsComponent, NzDescriptionsItemComponent } from "ng-zorro-antd/descriptions";
import { SelectedUserNameComponent } from "./selected-user-name/selected-user-name.component";
import { SelectedUserOrdersComponent } from "./selected-user-orders/selected-user-orders.component";

@Component({
  standalone: true,
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    NzSelectComponent,
    NzOptionComponent,
    SelectedUserNameComponent,
    SelectedUserOrdersComponent
  ],
})
export class UserOrdersComponent {
  readonly appStore = inject(AppStore);

  updateSelectedUser(userId: number | null) {
    this.appStore.selectUser(userId)
  }
}
