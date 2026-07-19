import { Routes } from '@angular/router';
import { LandingPage } from '../landing-page-features/landing-page/landing-page';
import { AdminBaseComponent } from '../../admin/components/admin-base-component/admin-base-component';

export const MainRoutes: Routes = [
  {
    path: 'admin',
    component: AdminBaseComponent,
  },
  {
    path: '',
    component: LandingPage,
  },
];
