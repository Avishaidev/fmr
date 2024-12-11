import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'prefix' },
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users.component').then(m => m.UsersPageComponent)
  },
  { path: '**', redirectTo: 'users', pathMatch: 'prefix' },
];
