import { AuthGuard } from './shared/guards/auth.guard';
import { CategoriasComponent } from './views/categorias/categorias.component';
import { ComercioEditarComponent } from './views/comercio-editar/comercio-editar.component';
import { ComerciosProductosComponent } from './views/comercios-productos/comercios-productos.component';
import { DummyComponent } from './views/dummy/dummy.component';
import { LandingComponent } from './views/landing/landing.component';
import { LocalRegistroComponent } from './views/local-registro/local-registro.component';
import { PedidoCrearComponent } from './views/pedido-crear/pedido-crear.component';
import { Route } from '@angular/router';
import { UsuarioModificarComponent } from './views/usuario-modificar/usuario-modificar.component';
import { UsuarioPerfilComponent } from './views/usuario-perfil/usuario-perfil.component';
import { UsuarioRegistroComponent } from './views/usuario-registro/usuario-registro.component';

export const greenLifeRoutes: Route[] = [
    { path: '', component: LandingComponent, data: { validar: true }, canActivate: [] },
    { path: 'registrarse', component: UsuarioRegistroComponent, canActivate: [] },
    { path: 'usuario/:login', component: UsuarioPerfilComponent, canActivate: [AuthGuard] },
    { path: 'usuario/:login/editar', component: UsuarioModificarComponent, canActivate: [AuthGuard] },
    { path: 'comercios/:comercioId/productos', component: ComerciosProductosComponent, canActivate: [AuthGuard] },
    { path: 'comercios/:comercioId/editar', component: ComercioEditarComponent, canActivate: [AuthGuard] },
    { path: 'comercios/:comercioId/locales', component: LocalRegistroComponent, canActivate: [AuthGuard] },
    { path: 'comercios/:comercioId/categorias', component: CategoriasComponent, canActivate: [AuthGuard] },
    { path: 'suscripciones/:suscripcionId/pedido/crear', component: PedidoCrearComponent, canActivate: [AuthGuard] },
    { path: 'dummy', component: DummyComponent, canActivate: [] },
];
