import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../../dialogos/login/login.component';
import { Router, NavigationStart } from '@angular/router';
import { LoginService } from '../../../shared';

@Component({
  selector: 'jhi-navbar-greenlife',
  templateUrl: './navbar-greenlife.component.html',
  styleUrls: [ 'navbar-greenlife.scss' ]
})
export class NavbarGreenlifeComponent implements OnInit {

  collapse = false;
  inicio = true;

  constructor(private dialog: MatDialog, private router: Router, private loginService: LoginService ) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/app' || event.url === '/') {
          this.inicio = true;
        } else {
          this.inicio = false;
        }
      }
    });
  }

  ngOnInit() {
    if (this.router.url === '/app' || this.router.url === '/') {
      this.inicio = true;
    } else {
      this.inicio = false;
    }
  }

  toggleCollapse() {
    this.collapse = !this.collapse;
  }

  openDialog() {
    this.dialog.open(LoginComponent, {
      width: '300px'
    });
  }

  cerrarSesion() {
    this.loginService.logout();
    this.router.navigate(['']);
  }
}
