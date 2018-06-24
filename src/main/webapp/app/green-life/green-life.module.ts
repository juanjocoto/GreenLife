import { MatButtonModule, MatButtonToggleModule, MatCardModule, MatGridListModule, MatListModule, MatMenuModule, MatToolbarModule } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FooterGreenlifeComponent } from './layout/footer-greenlife/footer-greenlife.component';
import { LandingComponent } from './views/landing/landing.component';
import { NavbarGreenlifeComponent } from './layout/navbar-greenlife/navbar-greenlife.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RootComponent } from './root/root.component';
import { RouterModule } from '@angular/router';
import { UsuarioPerfilComponent } from './views/usuario-perfil/usuario-perfil.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    MatMenuModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    RouterModule
  ],
  declarations: [
    LandingComponent,
    NavbarGreenlifeComponent,
    FooterGreenlifeComponent,
    RootComponent,
    UsuarioPerfilComponent]
})
export class GreenLifeModule { }
