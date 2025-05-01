import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./features/landing/landing.module').then(m => m.LandingModule)
    },
    {
        path: 'services',
        loadChildren: () => import('./features/booking/booking.module').then(m => m.BookingModule) // Asegúrate de tener la ruta correcta para el módulo de servicios
    },
    {
        path: '**',
        redirectTo: ''
    }
];
