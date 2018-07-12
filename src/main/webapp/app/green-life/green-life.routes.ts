import { Route } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { CategoriasComponent } from './views/categorias/categorias.component';
import { ComercioEditarComponent } from './views/comercio-editar/comercio-editar.component';
import { ComerciosLocalesComponent } from './views/comercios-locales/comercios-locales.component';
import { ComerciosProductosComponent } from './views/comercios-productos/comercios-productos.component';
import { DummyComponent } from './views/dummy/dummy.component';
import { LandingComponent } from './views/landing/landing.component';
import { LocalModificarComponent } from './views/local-modificar/local-modificar.component';
import { LocalPedidosComponent } from './views/local-pedidos/local-pedidos.component';
import { LocalRegistroComponent } from './views/local-registro/local-registro.component';
import { PedidoCrearComponent } from './views/pedido-crear/pedido-crear.component';
import { PedidoListarComponent } from './views/pedido-listar/pedido-listar.component';
import { PedidoModificarComponent } from './views/pedido-modificar/pedido-modificar.component';
import { SuscripcionCrearComponent } from './views/suscripcion-crear/suscripcion-crear.component';
import { SuscripcionesClienteComponent } from './views/suscripciones-cliente/suscripciones-cliente.component';
import { UsuarioModificarComponent } from './views/usuario-modificar/usuario-modificar.component';
import { UsuarioPerfilComponent } from './views/usuario-perfil/usuario-perfil.component';
import { UsuarioRegistroComponent } from './views/usuario-registro/usuario-registro.component';
import { ConfiguracionComerciosComponent } from './views/configuracion-comercios/configuracion-comercios.component';

export const greenLifeRoutes: Route[] = [
    { path: '', component: LandingComponent, data: { configuracion: false }, canActivate: [] },
    { path: 'registrarse', component: UsuarioRegistroComponent, data: { configuracion: false }, canActivate: [] },
    { path: 'usuario/:login', component: UsuarioPerfilComponent, data: { configuracion: true }, canActivate: [AuthGuard] },
    { path: 'usuario/:login/editar', component: UsuarioModificarComponent, data: { configuracion: true }, canActivate: [AuthGuard] },
    { path: 'comercios/:comercioId/productos', component: ComerciosProductosComponent, data: { configuracion: true }, canActivate: [AuthGuard] },
    { path: 'comercios/:comercioId/editar', component: ComercioEditarComponent, data: { configuracion: true }, canActivate: [AuthGuard] },
    { path: 'comercios/:comercioId/locales', component: ComerciosLocalesComponent, data: { configuracion: true }, canActivate: [AuthGuard] },
    { path: 'comercios/:comercioId/local/agregar', component: LocalRegistroComponent, data: { configuracion: true }, canActivate: [AuthGuard] },
    { path: 'comercios/:comercioId/local/editar/:localId', component: LocalModificarComponent, data: { configuracion: true }, canActivate: [AuthGuard] },
    { path: 'comercios/:comercioId/categorias', component: CategoriasComponent, data: { configuracion: true }, canActivate: [AuthGuard] },
    { path: 'locales/:localId/pedidos', component: LocalPedidosComponent, data: { configuracion: false }, canActivate: [AuthGuard] },
    { path: 'suscripciones/:suscripcionId/pedido/crear', component: PedidoCrearComponent, data: { configuracion: false }, canActivate: [AuthGuard] },
    { path: 'suscripciones/:suscripcionId/pedido', component: PedidoListarComponent, data: { configuracion: false }, canActivate: [AuthGuard] },
    { path: 'suscripciones/:suscripcionId/pedido/:pedidoId', component: PedidoModificarComponent, data: { configuracion: false }, canActivate: [AuthGuard] },
    { path: 'dummy', component: DummyComponent, data: { configuracion: false }, canActivate: [] },
    { path: 'usuario/:login/suscripcion/comercio/:comercioId', component: SuscripcionCrearComponent, data: { configuracion: false }, canActivate: [AuthGuard] },
    { path: 'usuario/:login/suscripciones', component: SuscripcionesClienteComponent, data: { configuracion: false }, canActivate: [AuthGuard] },
    { path: 'pedido/:pedidoId/editar', component: PedidoModificarComponent, data: { configuracion: false }, canActivate: [AuthGuard] },
    { path: 'usuario/:login/comercios', component: ConfiguracionComerciosComponent, data: { configuracion: true }, canActivate: [AuthGuard]}
];
