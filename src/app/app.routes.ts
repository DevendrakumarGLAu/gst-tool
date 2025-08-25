import { Routes } from '@angular/router';
import { LoginComponent } from './common/login/login.component';
import { SignupComponent } from './common/signup/signup.component';
import { MainLayerComponent } from './main-layer/main-layer.component';

export const routes: Routes = [
  // Auth Routes (no layout)
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent }
    ]
  },

  // Main app routes with layout
  {
    path: '',
    component: MainLayerComponent,
    children: [
      // You can define your main child routes here:
      // { path: 'dashboard', component: DashboardComponent },
      // { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },  // Default child
      { path: 'home', loadComponent: () => import('./common/home/home.component').then(m => m.HomeComponent) }
    ]
  },

  // Catch-all redirect
  { path: '**', redirectTo: '' }
];
