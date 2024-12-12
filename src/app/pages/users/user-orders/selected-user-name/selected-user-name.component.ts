import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { AppStore } from '../../../../store/app.store';

@Component({
  standalone: true,
  selector: 'app-selected-user-name',
  templateUrl: './selected-user-name.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedUserNameComponent {
  readonly appStore = inject(AppStore);
}
