import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { NavbarGreenlifeComponent } from './layout/navbar-greenlife/navbar-greenlife.component';
import { FooterGreenlifeComponent } from './layout/footer-greenlife/footer-greenlife.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatMenuModule, MatButtonModule, MatButtonToggleModule, MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatToolbarModule
  ],
  declarations: [LandingComponent, NavbarGreenlifeComponent, FooterGreenlifeComponent]
})
export class GreenLifeModule { }
