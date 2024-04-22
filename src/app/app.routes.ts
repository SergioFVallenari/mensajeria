import { Routes } from '@angular/router';
import { MainComponent } from './core/auth/component/layout/main/main.component';
import { AuthGuard } from './core/auth-guard.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth' },
  {
    path: '',
    component: MainComponent,
    canActivate:[AuthGuard],
    children:[
      { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
      { path: 'contacts', loadChildren: () => import('./pages/contacts/contacts.routes').then(m => m.CONTACTS_ROUTES) },
    ]
  },
  { path: 'auth', loadComponent: () => import('./core/auth/component/auth/auth.component').then(m => m.AuthComponent) }
];
