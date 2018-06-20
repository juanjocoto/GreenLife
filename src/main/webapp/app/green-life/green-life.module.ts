import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { NavbarGreenlifeComponent } from './layout/navbar-greenlife/navbar-greenlife.component';
import { FooterGreenlifeComponent } from './layout/footer-greenlife/footer-greenlife.component';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule
  ],
  declarations: [LandingComponent, NavbarGreenlifeComponent, FooterGreenlifeComponent]
})
export class GreenLifeModule { }
