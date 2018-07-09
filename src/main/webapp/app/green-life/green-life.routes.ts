import { Route } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { CategoriasComponent } from './views/categorias/categorias.component';
import { ComercioEditarComponent } from './views/comercio-editar/comercio-editar.component';
import { ComerciosProductosComponent } from './views/comercios-productos/comercios-productos.component';
import { LandingComponent } from './views/landing/landing.component';
import { LocalRegistroComponent } from './views/local-registro/local-registro.component';
import { UsuarioModificarComponent } from './views/usuario-modificar/usuario-modificar.component';
import { UsuarioPerfilComponent } from './views/usuario-perfil/usuario-perfil.component';
import { UsuarioRegistroComponent } from './views/usuario-registro/usuario-registro.component';
import {SuscripcionesClienteComponent} from './views/suscripciones-cliente/suscripciones-cliente.component';

export const greenLifeRoutes: Route[] = [
    { path: '', component: LandingComponent, data: { configuracion: false }, canActivate: [] },
    { path: 'registrarse', component: UsuarioRegistroComponent, data: { configuracion: false }, canActivate: [] },
    { path: 'usuario/:login', component: UsuarioPerfilComponent, data: { configuracion: false }, canActivate: [ AuthGuard ] },
    { path: 'usuario/:login/editar', component: UsuarioModificarComponent, data: { configuracion: true }, canActivate: [ AuthGuard ] },
    { path: 'comercios/:comercioId/productos', component: ComerciosProductosComponent, data: { configuracion: true }, canActivate: [ AuthGuard ] },
    { path: 'comercios/:comercioId/editar', component: ComercioEditarComponent, data: { configuracion: true }, canActivate: [ AuthGuard ] },
    { path: 'comercios/:comercioId/locales', component: LocalRegistroComponent, data: { configuracion: true }, canActivate: [ AuthGuard ] },
    { path: 'comercios/:comercioId/categorias', component: CategoriasComponent, data: { configuracion: true }, canActivate: [ AuthGuard ] },
    { path: 'usuario/:login/suscripciones', component: SuscripcionesClienteComponent, data: { configuracion: false }, canActivate: [ AuthGuard ] }
];
