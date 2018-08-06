import {ActivatedRoute, Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService, User} from '../../../shared';

import { AccountService } from '../../../shared/auth/account.service';
import {ConfirmacionDialogComponent} from '../../dialogos/confirmacion-dialog/confirmacion-dialog.component';
import {HttpResponse} from '@angular/common/http';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import {MouseEvent} from '@agm/core';
import { Observable } from 'rxjs/Rx';
import { UserService } from './../../../shared/user/user.service';
import { Usuario } from '../../../entities/usuario';
import { UsuarioService } from './../../../entities/usuario/usuario.service';

@Component({
    selector: 'jhi-usuario-modificar',
    templateUrl: './usuario-modificar.component.html',
    styleUrls: ['./usuario-modificar.component.scss']
})
export class UsuarioModificarComponent implements OnInit {

    usuario: Usuario;
    user: User;
    formulario: FormGroup;

    // Google Maps default configuration
    zoom = 7.5;
    // Default Latitude and Longitude (San Jose, Costa Rica)
    lat = 9.935354;
    long = -84.082753;
    // Local marker
    marker: Marker = {
        lat: this.lat,
        long: this.long
    };

    constructor(
        private usuarioService: UsuarioService,
        private userService: UserService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private loginService: LoginService,
        private router: Router,
        private location: Location,
        private account: AccountService) { }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            if (params && params.login) {
                this.getUser(this.usuarioService.findByUserLogin(params.login), this.userService.find(params.login));
            } else {
                this.account.get().subscribe((httpResponse) => {
                    this.getUser(this.usuarioService.findByUserLogin(httpResponse.body['login']), this.userService.find(httpResponse.body['login']));
                });
            }
        });
    }

    getUser(observableUsuario: Observable<HttpResponse<Usuario>>, observableUser: Observable<HttpResponse<User>>): void {
        Observable.zip(observableUsuario, observableUser).subscribe((resul) => {
            this.usuario = resul[0].body;
            this.user = resul[1].body;

            if (this.usuario.latitud) {
                this.lat = this.usuario.latitud;
                this.long = this.usuario.longitud;
            }

            this.formulario = this.formBuilder.group({
                apellido: [this.user.lastName, [
                    Validators.required,
                ]],
                nombre: [this.user.firstName, [
                    Validators.required
                ]],
                fechaNacimiento: [this.usuario.fechaNacimiento, [
                    Validators.required,
                ]],
                cedula: [this.usuario.cedula, [
                    Validators.required,
                    Validators.minLength(9),
                    Validators.maxLength(9)
                ]],
                telefono: [this.usuario.telefono, [
                    Validators.minLength(8),
                    Validators.maxLength(8)
                ]],
                direccion: [this.usuario.direccion, [
                ]],
                correo: [this.user.email, [
                    Validators.required,
                    Validators.email
                ]],
                latitud: [this.lat, [
                ]],
                longitud: [this.long, [
                ]],
                usuario: [this.user.login, [
                    Validators.required
                ]]
            });
        });
    }

    modificarUsuario() {

        this.user.firstName = this.formulario.get('nombre').value;
        this.user.lastName = this.formulario.get('apellido').value;
        this.user.email = this.formulario.get('correo').value;
        this.user.login = this.formulario.get('usuario').value;

        this.usuario.cedula = this.formulario.get('cedula').value;
        this.usuario.telefono = this.formulario.get('telefono').value;
        this.usuario.direccion = this.formulario.get('direccion').value;
        this.usuario.latitud = this.marker.lat;
        this.usuario.longitud = this.marker.long;
        this.usuario.fechaNacimiento = this.convertirFecha(new Date(this.formulario.get('fechaNacimiento').value));

        if (this.formulario.valid) {
            this.userService.update(this.user).subscribe((result) => {
                this.usuario.fechaCreacion = this.convertirFecha(new Date());

                this.usuarioService.update(this.usuario).subscribe((resuld) => {
                    this.location.back();
                });
            });
        }
    }

    private convertirFecha(value: Date, args?: any): any {
        return {
            year: value.getFullYear(),
            month: value.getMonth() + 1,
            day: value.getDate()
        };
    }

    eliminarUsuario() {
        const res = this.dialog.open(ConfirmacionDialogComponent);
        res.componentInstance.texto = ` ¿Estás seguro? Al desactivar tu cuenta, se ocultaran tus datos. Puedes volver a reactivar tu cuenta en cualquier momento.`;
        res.afterClosed().subscribe((result) => {
            if (result) {
                this.user.activated = false;

                this.userService.update(this.user).subscribe((resuld) => {
                    this.loginService.logout();
                    this.router.navigate(['']);
                });
            }
        });
    }

    // Google Maps method
    markerDragEnd($event: MouseEvent) {
        this.marker.lat = $event.coords.lat;
        this.marker.long = $event.coords.lng;
    }
}

// Google Maps marker interface
interface Marker {
    lat: number;
    long: number;
}
