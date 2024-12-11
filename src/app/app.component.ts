import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzContentComponent, NzHeaderComponent, NzLayoutComponent } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, NzLayoutComponent, NzHeaderComponent, NzContentComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
