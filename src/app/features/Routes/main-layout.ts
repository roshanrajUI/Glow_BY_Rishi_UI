import { Routes } from '@angular/router';
import { LandingPage } from '../landing-page-features/landing-page/landing-page';
import { AdminBaseComponent } from '../../admin/components/admin-base-component/admin-base-component';
import { ClientBookingComponent } from '../../features/client-booking-component/client-booking-component';

export const MainRoutes: Routes = [
  {
    path: 'admin',
    component: AdminBaseComponent,
  },
  {
    path: 'my-bookings',
    component: ClientBookingComponent,
  },
  {
    path: '',
    component: LandingPage,
  },
];
