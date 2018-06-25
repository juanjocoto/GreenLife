import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatToolbarModule,
  MatDialogModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ConvertidorFechaPipe } from './shared/pipes/convertidor-fecha.pipe';
import { FooterGreenlifeComponent } from './layout/footer-greenlife/footer-greenlife.component';
import { LandingComponent } from './views/landing/landing.component';
import { NavbarGreenlifeComponent } from './layout/navbar-greenlife/navbar-greenlife.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RootComponent } from './root/root.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './dialogos/login/login.component';
import { UsuarioRegistroComponent } from './views/usuario-registro/usuario-registro.component';
import { ValidadorNumeroDirective } from './shared/directives/validador-numero.directive';

@NgModule({
  imports: [
    RouterModule,
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
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    FormsModule
  ],
  declarations: [
    LandingComponent,
    NavbarGreenlifeComponent,
    FooterGreenlifeComponent,
    RootComponent,
    LoginComponent,
    UsuarioRegistroComponent,
    ValidadorNumeroDirective,
    ConvertidorFechaPipe
  ],
  entryComponents: [
    LoginComponent
  ]
})
export class GreenLifeModule { }
