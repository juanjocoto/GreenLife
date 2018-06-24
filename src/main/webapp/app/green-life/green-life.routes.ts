import { LandingComponent } from './views/landing/landing.component';
import { Route } from '@angular/router';
import { UsuarioRegistroComponent } from './views/usuario-registro/usuario-registro.component';

export const greenLifeRoutes: Route[] = [
    { path: '', component: LandingComponent },
    { path: 'registrarse', component: UsuarioRegistroComponent }
];
