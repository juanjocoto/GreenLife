import { MatButtonModule, MatButtonToggleModule, MatCardModule, MatGridListModule,
  MatListModule, MatMenuModule, MatToolbarModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterGreenlifeComponent } from './layout/footer-greenlife/footer-greenlife.component';
import { LandingComponent } from './views/landing/landing.component';
import { NavbarGreenlifeComponent } from './layout/navbar-greenlife/navbar-greenlife.component';
import { NgModule } from '@angular/core';
import { RootComponent } from './root/root.component';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './dialogos/login/login.component';

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
    MatDialogModule,
    FormsModule,
    RouterModule
  ],
  declarations: [LandingComponent, NavbarGreenlifeComponent, FooterGreenlifeComponent,
    RootComponent, LoginComponent],
  entryComponents: [LoginComponent]
})
export class GreenLifeModule { }
