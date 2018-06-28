import { LandingComponent } from './views/landing/landing.component';
import { Route } from '@angular/router';
import { UsuarioPerfilComponent } from './views/usuario-perfil/usuario-perfil.component';
import { UsuarioRegistroComponent } from './views/usuario-registro/usuario-registro.component';
import {ConfigComercioLocalesComponent} from './views/config-comercio-locales/config-comercio-locales.component';

export const greenLifeRoutes: Route[] = [
    { path: '', component: LandingComponent },
    { path: 'registrarse', component: UsuarioRegistroComponent },
    { path: 'usuario/:login', component: UsuarioPerfilComponent },
    { path: ':idComercio/local/:idLocal', component: ConfigComercioLocalesComponent }
];
