import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login.page').then(m => m.LoginPage)
  },
  {
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [() => {
      const auth = inject(AuthService);
      const router = inject(Router);
      if (!auth.isAuthenticated()) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    }],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/pages/dashboard.page').then(m => m.DashboardPage) },
      { path: 'explore', loadComponent: () => import('./features/devices/pages/explore.page').then(m => m.ExplorePage) },
      { path: 'devices/:id', loadComponent: () => import('./features/devices/pages/device-detail.page').then(m => m.DeviceDetailPage) },
      { path: 'compare', loadComponent: () => import('./features/compare/pages/compare.page').then(m => m.ComparePage) },
      { path: 'roi', loadComponent: () => import('./features/roi/pages/roi.page').then(m => m.RoiPage) },
      { path: 'journey', loadComponent: () => import('./features/journey/pages/journey.page').then(m => m.JourneyPage) },
      { path: 'insights', loadComponent: () => import('./features/insights/pages/insights.page').then(m => m.InsightsPage) },
      { path: 'saved', loadComponent: () => import('./features/saved/pages/saved.page').then(m => m.SavedPage) },
      { path: 'agents', loadComponent: () => import('./features/agents/pages/agents.page').then(m => m.AgentsPage) },
      { path: 'admin', 
        loadComponent: () => import('./features/admin/pages/admin.page').then(m => m.AdminPage),
        canActivate: [() => inject(AuthService).isAdmin()]
      },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
