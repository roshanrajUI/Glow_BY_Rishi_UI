import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { MainRoutes } from './features/Routes/main-layout';

export const routes: Routes = [
    {
        path: '',
        children: MainRoutes
    },
    {
        path: '**',
        component: MainLayout
    }
];
