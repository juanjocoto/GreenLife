import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, RoutesRecognized } from '@angular/router';
import { LoginService, AccountService } from '../../../shared';
import { LoginComponent } from '../../dialogos/login/login.component';

@Component({
  selector: 'jhi-navbar-greenlife',
  templateUrl: './navbar-greenlife.component.html',
  styleUrls: ['navbar-greenlife.scss']
})
export class NavbarGreenlifeComponent implements OnInit {

  collapse = false;
  configuracion = false;
  isAuth = false;

  constructor(private dialog: MatDialog, private router: Router, private loginService: LoginService, private auth: AccountService) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof RoutesRecognized) {
        const data = event.state.root.firstChild.firstChild.data;
        this.configuracion = data.configuracion as boolean;
        this.auth.get().subscribe((resul) => {
          this.isAuth = true;
        }, () => {
          this.isAuth = false;
        });
      }
    });
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
    this.router.navigate(['/']);
  }
}
