import { LandingComponent } from './views/landing/landing.component';
import { Route } from '@angular/router';
import { UsuarioPerfilComponent } from './views/usuario-perfil/usuario-perfil.component';

export const greenLifeRoutes: Route[] = [
    { path: '', component: LandingComponent },
    { path: 'usuario/:login', component: UsuarioPerfilComponent }
];
