import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { LoginComponent } from '../../dialogos/login/login.component';

@Component({
  selector: 'jhi-navbar-greenlife',
  templateUrl: './navbar-greenlife.component.html',
    styleUrls: [
        'navbar-greenlife.scss'
    ]
})
export class NavbarGreenlifeComponent implements OnInit {
   isNavbarCollapsed = true;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    this.dialog.open(LoginComponent, {
      width: '300px'
    });
  }
}
