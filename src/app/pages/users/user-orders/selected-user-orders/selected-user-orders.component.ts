import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { AppStore } from '../../../../store/app.store';

@Component({
  standalone: true,
  selector: 'app-selected-user-orders',
  templateUrl: './selected-user-orders.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedUserOrdersComponent {
  readonly appStore = inject(AppStore);
}
