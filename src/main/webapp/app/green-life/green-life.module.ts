import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DATE_LOCALE,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

import { AgmCoreModule } from '@agm/core';
import { AuthAdminGuard } from './shared/guards/auth.admin.guard';
import { AuthService } from './shared/services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CargaImagenesComponent } from './dialogos/carga-imagenes/carga-imagenes.component';
import { CategoriasComponent } from './views/categorias/categorias.component';
import { CategoriasModificarComponent } from './dialogos/categorias-modificar/categorias-modificar.component';
import { CategoriasRegistroComponent } from './dialogos/categorias-registro/categorias-registro.component';
import { CdkTableModule } from '@angular/cdk/table';
import { ColonPipe } from './shared/pipes/colon.pipe';
import { ComercioEditarComponent } from './views/comercio-editar/comercio-editar.component';
import { ComerciosLocalesComponent } from './views/comercios-locales/comercios-locales.component';
import { ComerciosProductosComponent } from './views/comercios-productos/comercios-productos.component';
import { ComerciosRegistroComponent } from './dialogos/comercios-registro/comercios-registro.component';
import { CommonAdapterService } from './shared/services/common-adapter.service';
import { CommonModule } from '@angular/common';
import { ConfiguracionAplicacionComponent } from './views/configuracion-aplicacion/configuracion-aplicacion.component';
import { ConfiguracionComerciosComponent } from './views/configuracion-comercios/configuracion-comercios.component';
import { ConfirmacionDialogComponent } from './dialogos/confirmacion-dialog/confirmacion-dialog.component';
import { ConvertidorFechaPipe } from './shared/pipes/convertidor-fecha.pipe';
import { DummyComponent } from './views/dummy/dummy.component';
import { FooterGreenlifeComponent } from './layout/footer-greenlife/footer-greenlife.component';
import { HorasEntregaService } from './shared/services/horas-entrega.service';
import { LandingComponent } from './views/landing/landing.component';
import { ListaComerciosComponent } from './fragments/lista-comercios/lista-comercios.component';
import { LocalEliminarComponent } from './dialogos/local-eliminar/local-eliminar.component';
import { LocalModificarComponent } from './views/local-modificar/local-modificar.component';
import { LocalPedidosComponent } from './views/local-pedidos/local-pedidos.component';
import { LocalRegistroComponent } from './views/local-registro/local-registro.component';
import { LoginComponent } from './dialogos/login/login.component';
import { NavbarGreenlifeComponent } from './layout/navbar-greenlife/navbar-greenlife.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PedidoCrearComponent } from './views/pedido-crear/pedido-crear.component';
import { PedidoListarComponent } from './views/pedido-listar/pedido-listar.component';
import { PedidoModificarComponent } from './views/pedido-modificar/pedido-modificar.component';
import { RootComponent } from './root/root.component';
import { RouterModule } from '@angular/router';
import { SelectorEtiquetasComponent } from './fragments/selector-etiquetas/selector-etiquetas.component';
import { SnackBarService } from './shared/services/snack-bar.service';
import { SuscripcionCrearComponent } from './views/suscripcion-crear/suscripcion-crear.component';
import { SuscripcionesClienteComponent } from './views/suscripciones-cliente/suscripciones-cliente.component';
import { SuscripcionesComercioComponent } from './views/suscripciones-comercio/suscripciones-comercio.component';
import { UsuarioModificarComponent } from './views/usuario-modificar/usuario-modificar.component';
import { UsuarioPerfilComponent } from './views/usuario-perfil/usuario-perfil.component';
import { UsuarioRegistroComponent } from './views/usuario-registro/usuario-registro.component';
import { UsuarioRolesComponent } from './views/usuario-roles/usuario-roles.component';
import { ValidadorNumeroDirective } from './shared/directives/validador-numero.directive';
import { EtiquetasConsultarComponent } from './dialogos/etiquetas-consultar/etiquetas-consultar.component';
import { ResenaComponent } from './dialogos/resena/resena.component';

@NgModule({
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAKK8_ZbHnWx9CD9b4NZFGRKe8rMw83wmI'
    }),
    ReactiveFormsModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatFormFieldModule
  ],
  declarations: [
    LandingComponent,
    NavbarGreenlifeComponent,
    FooterGreenlifeComponent,
    RootComponent,
    UsuarioPerfilComponent,
    LoginComponent,
    UsuarioRegistroComponent,
    ValidadorNumeroDirective,
    UsuarioRolesComponent,
    ConvertidorFechaPipe,
    ColonPipe,
    ComerciosProductosComponent,
    LocalRegistroComponent,
    ComerciosRegistroComponent,
    UsuarioModificarComponent,
    ListaComerciosComponent,
    ComercioEditarComponent,
    SelectorEtiquetasComponent,
    CategoriasComponent,
    CategoriasRegistroComponent,
    CargaImagenesComponent,
    ConfirmacionDialogComponent,
    LocalModificarComponent,
    LocalEliminarComponent,
    DummyComponent,
    PedidoCrearComponent,
    PedidoModificarComponent,
    ComerciosLocalesComponent,
    SuscripcionCrearComponent,
    SuscripcionesClienteComponent,
    LocalPedidosComponent,
    CategoriasModificarComponent,
    PedidoListarComponent,
    ConfiguracionComerciosComponent,
    ConfiguracionAplicacionComponent,
    SuscripcionesComercioComponent,
    EtiquetasConsultarComponent,
    ResenaComponent
  ],
  entryComponents: [
    LoginComponent,
    ComerciosRegistroComponent,
    CategoriasRegistroComponent,
    CategoriasModificarComponent,
    ConfirmacionDialogComponent,
    LocalEliminarComponent,
    CargaImagenesComponent,
    EtiquetasConsultarComponent,
    ResenaComponent
  ],
  providers: [
    CommonAdapterService,
    CategoriasComponent,
    HorasEntregaService,
    AuthService,
    AuthAdminGuard,
    SnackBarService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-CR' }
  ],
})
export class GreenLifeModule { }
