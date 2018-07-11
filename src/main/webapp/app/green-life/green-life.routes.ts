import { AuthGuard } from './shared/guards/auth.guard';
import { CategoriasComponent } from './views/categorias/categorias.component';
import { ComercioEditarComponent } from './views/comercio-editar/comercio-editar.component';
import { ComerciosLocalesComponent } from './views/comercios-locales/comercios-locales.component';
import { ComerciosProductosComponent } from './views/comercios-productos/comercios-productos.component';
import { DummyComponent } from './views/dummy/dummy.component';
import { LandingComponent } from './views/landing/landing.component';
import { LocalModificarComponent } from './views/local-modificar/local-modificar.component';
import { LocalRegistroComponent } from './views/local-registro/local-registro.component';
import { PedidoCrearComponent } from './views/pedido-crear/pedido-crear.component';
import { Route } from '@angular/router';
import { SuscripcionCrearComponent } from './views/suscripcion-crear/suscripcion-crear.component';
import { UsuarioModificarComponent } from './views/usuario-modificar/usuario-modificar.component';
import { UsuarioPerfilComponent } from './views/usuario-perfil/usuario-perfil.component';
import { UsuarioRegistroComponent } from './views/usuario-registro/usuario-registro.component';
import {SuscripcionesComercioComponent} from './views/suscripciones-comercio/suscripciones-comercio.component';

export const greenLifeRoutes: Route[] = [
    { path: '', component: LandingComponent, data: { configuracion: false }, canActivate: [] },
    { path: 'registrarse', component: UsuarioRegistroComponent, data: { configuracion: false }, canActivate: [] },
    { path: 'usuario/:login', component: UsuarioPerfilComponent, data: { configuracion: false }, canActivate: [AuthGuard] },
    { path: 'usuario/:login/editar', component: UsuarioModificarComponent, data: { configuracion: true }, canActivate: [AuthGuard] },
    { path: 'comercios/:comercioId/productos', component: ComerciosProductosComponent, data: { configuracion: true }, canActivate: [AuthGuard] },
    { path: 'comercios/:comercioId/editar', component: ComercioEditarComponent, data: { configuracion: true }, canActivate: [AuthGuard] },
    { path: 'comercios/:comercioId/locales', component: ComerciosLocalesComponent, data: { configuracion: true }, canActivate: [AuthGuard] },
    { path: 'comercios/:comercioId/local/agregar', component: LocalRegistroComponent, data: { configuracion: true }, canActivate: [AuthGuard] },
    { path: 'comercios/:comercioId/local/editar/:localId', component: LocalModificarComponent, data: { configuracion: true }, canActivate: [AuthGuard] },
    { path: 'comercios/:comercioId/categorias', component: CategoriasComponent, data: { configuracion: true }, canActivate: [AuthGuard] },
    { path: 'suscripciones/:suscripcionId/pedido/crear', component: PedidoCrearComponent, data: { configuracion: false }, canActivate: [AuthGuard] },
    { path: 'dummy', component: DummyComponent, data: { configuracion: false }, canActivate: [] },
    { path: 'cliente/:login/suscripcion/comercio/:comercioId', component: SuscripcionCrearComponent, data: { configuracion: false }, canActivate: [AuthGuard] },
    { path: 'comercios/:comercioId/suscripciones', component: SuscripcionesComercioComponent}
];
