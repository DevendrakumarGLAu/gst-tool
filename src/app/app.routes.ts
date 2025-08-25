import { Routes } from '@angular/router';
import { MainLayerComponent } from './main-layer/main-layer.component';
import { PubliclayoutComponent } from './publiclayout/publiclayout.component';
import { HomeComponent } from './common/home/home.component';

export const routes: Routes = [
  // Public Layout (No auth required)
  {
    path: '',
    component: PubliclayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'auth/login',
        loadComponent: () =>
          import('./common/login/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'auth/signup',
        loadComponent: () =>
          import('./common/signup/signup.component').then(m => m.SignupComponent),
      },
    ],
  },

  // Authenticated Layout (with header/footer)
  {
    path: 'main',
    component: MainLayerComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
    //   {
    //     path: 'tools',
    //     loadComponent: () =>
    //       import('./tools/tools.component').then(m => m.ToolsComponent),
    //   },
    //   {
    //     path: 'screenshot',
    //     loadComponent: () =>
    //       import('./screenshot/screenshot.component').then(m => m.ScreenshotComponent),
    //   },
    //   {
    //     path: 'support',
    //     loadComponent: () =>
    //       import('./support/support.component').then(m => m.SupportComponent),
    //   },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },

  // Wildcard route
  { path: '**', redirectTo: '' },
];
