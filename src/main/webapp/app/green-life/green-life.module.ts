import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LandingComponent } from './landing/landing.component';
import { NavbarGreenlifeComponent } from './layout/navbar-greenlife/navbar-greenlife.component';
import { FooterGreenlifeComponent } from './layout/footer-greenlife/footer-greenlife.component';
import { MatMenuModule, MatButtonModule, MatButtonToggleModule, MatToolbarModule, MatCardModule, MatGridListModule, MatListModule } from '@angular/material';

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
    MatListModule
  ],
  declarations: [LandingComponent, NavbarGreenlifeComponent, FooterGreenlifeComponent]
})
export class GreenLifeModule { }
