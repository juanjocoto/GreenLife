import { ComerciosProductosComponent } from './views/comercios-productos/comercios-productos.component';
import { ConfigComercioLocalesComponent } from './views/config-comercio-locales/config-comercio-locales.component';
import { LandingComponent } from './views/landing/landing.component';
import { Route } from '@angular/router';
import { UsuarioModificarComponent } from './views/usuario-modificar/usuario-modificar.component';
import { UsuarioPerfilComponent } from './views/usuario-perfil/usuario-perfil.component';
import { UsuarioRegistroComponent } from './views/usuario-registro/usuario-registro.component';

export const greenLifeRoutes: Route[] = [
    { path: '', component: LandingComponent },
    { path: 'registrarse', component: UsuarioRegistroComponent },
    { path: 'usuario/:login', component: UsuarioPerfilComponent },
    { path: 'comercios/:comercioId/productos', component: ComerciosProductosComponent },
    { path: 'comercios/:comercioId/locales', component: ConfigComercioLocalesComponent },
    { path: 'comercios/:comercioId/productos', component: ComerciosProductosComponent},
    { path: 'modificar/:login', component: UsuarioModificarComponent}
];
