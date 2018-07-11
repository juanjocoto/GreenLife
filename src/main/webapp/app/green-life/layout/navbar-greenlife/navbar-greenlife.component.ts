import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';
import {AccountService, LoginService, User, UserService} from '../../../shared';
import {LoginComponent} from '../../dialogos/login/login.component';
import {HttpResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-navbar-greenlife',
    templateUrl: './navbar-greenlife.component.html',
    styleUrls: ['navbar-greenlife.scss']
})
export class NavbarGreenlifeComponent implements OnInit {

    collapse = false;
    configuracion = true;
    isAuth = true;
    usuarioId = '';
    currentUser: User;

    constructor(private dialog: MatDialog,
                private router: Router,
                private loginService: LoginService,
                private auth: AccountService,
                private userService: UserService,
                private route: ActivatedRoute) {
        this.verificarSesion();
        if (!this.route.firstChild.data['value']['configuracion']) {
            this.configuracion = false;
        }
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof RoutesRecognized) {
                const data = event.state.root.firstChild.firstChild.data;
                this.configuracion = data.configuracion as boolean;
                this.verificarSesion();
            }
        });
    }

    private verificarSesion() {
        this.auth.get().subscribe((resul) => {
            this.isAuth = true;
            this.usuarioId = resul.body['login'];
            this.loadCurrentUser(resul.body['login']);
        }, () => {
            this.isAuth = false;
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

    private loadCurrentUser(login) {
        this.userService.find(login).subscribe((userResponse: HttpResponse<User>) => {
            this.currentUser = userResponse.body;
        });
    }
}
