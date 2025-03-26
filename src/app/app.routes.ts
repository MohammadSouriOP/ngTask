import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/user-list/user-list.component').then(m => m.UserListComponent)
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/user-form/user-form.component').then(m => m.UserFormComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/user-form/user-form.component').then(m => m.UserFormComponent)
  }
];
