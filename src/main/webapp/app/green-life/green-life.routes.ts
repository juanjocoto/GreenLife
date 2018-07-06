import { CategoriasComponent } from './views/categorias/categorias.component';
import { ComercioEditarComponent } from './views/comercio-editar/comercio-editar.component';
import { ComerciosProductosComponent } from './views/comercios-productos/comercios-productos.component';
import { LandingComponent } from './views/landing/landing.component';
import { Route } from '@angular/router';
import { UsuarioModificarComponent } from './views/usuario-modificar/usuario-modificar.component';
import { UsuarioPerfilComponent } from './views/usuario-perfil/usuario-perfil.component';
import { UsuarioRegistroComponent } from './views/usuario-registro/usuario-registro.component';
import {ComerciosLocalesComponent} from './views/comercios-locales/comercios-locales.component';
import {LocalRegistroComponent} from './views/local-registro/local-registro.component';
import {LocalModificarComponent} from './views/local-modificar/local-modificar.component';

export const greenLifeRoutes: Route[] = [
    { path: '', component: LandingComponent },
    { path: 'registrarse', component: UsuarioRegistroComponent },
    { path: 'usuario/:login', component: UsuarioPerfilComponent },
    { path: 'comercios/:comercioId/productos', component: ComerciosProductosComponent },
    { path: 'modificar/:login', component: UsuarioModificarComponent },
    { path: 'comercios/:comercioId/editar', component: ComercioEditarComponent },
    { path: 'comercios/:comercioId/locales', component: ComerciosLocalesComponent },
    { path: 'comercios/:comercioId/local/agregar', component: LocalRegistroComponent },
    { path: 'comercios/:comercioId/local/editar/:localId', component: LocalModificarComponent },
    { path: 'comercios/:comercioId/categorias', component: CategoriasComponent},
    { path: 'comercios/:comercioId/locales', component: LocalRegistroComponent },
    { path: 'comercios/:comercioId/productos', component: ComerciosProductosComponent },
    { path: 'modificar/:login', component: UsuarioModificarComponent },
];
