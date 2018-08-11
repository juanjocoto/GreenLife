import {CommonAdapterService, JHILocalDate} from '../../shared/services/common-adapter.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

import {Register} from './../../../account/register/register.service';
import {Router} from '@angular/router';
import {User} from '../../../shared';
import {Usuario} from '../../../entities/usuario';
import {UsuarioService} from './../../../entities/usuario/usuario.service';

@Component({
    selector: 'jhi-usuario-registro',
    templateUrl: './usuario-registro.component.html',
    styleUrls: ['./usuario-registro.component.scss']
})
export class UsuarioRegistroComponent implements OnInit {

    formulario: FormGroup;

    maxDate: Date;

    constructor(private formBuilder: FormBuilder,
                private registerService: Register,
                private usuarioService: UsuarioService,
                private router: Router,
                private commonAdapterService: CommonAdapterService,
                public snackBar: MatSnackBar
    ) {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 18);
        this.maxDate = date;
    }

    ngOnInit() {
        this.formulario = this.formBuilder.group({
            nombre: ['', [
                Validators.required
            ]],
            apellidos: ['', [
                Validators.required
            ]],
            correo: ['', [
                Validators.required,
                Validators.email
            ]],
            usuario: ['', [
                Validators.required
            ]],
            clave: ['', [
                Validators.required,
                Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                Validators.minLength(8)
            ]],
            confirmacionClave: ['', [
                Validators.required,
                Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                Validators.minLength(8)
            ]],
            fechaNacimiento: ['', [
                Validators.required
            ]],
            cedula: ['', [
                Validators.required,
                Validators.minLength(9),
                Validators.maxLength(9)
            ]],
            telefono: ['', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(8)
            ]]
        });
    }

    crearUsuario() {
        const nuevoUsuario = new Usuario(),
            newUser = new User();

        newUser.login = this.formulario.get('usuario').value;
        newUser.email = this.formulario.get('correo').value;
        newUser.firstName = this.formulario.get('nombre').value;
        newUser.lastName = this.formulario.get('apellidos').value;
        newUser.password = this.formulario.get('clave').value;
        newUser.authorities = ['ROLE_USER'];
        newUser.activated = true;

        nuevoUsuario.cedula = this.formulario.get('cedula').value;
        nuevoUsuario.fechaNacimiento = this.commonAdapterService.dateToJHILocalDate(new Date(this.formulario.get('fechaNacimiento').value));
        nuevoUsuario.telefono = this.formulario.get('telefono').value;

        if (this.formulario.valid && this.confirmarClave()) {
            this.registerService.save(newUser).subscribe((id) => {
                nuevoUsuario.userDetailId = id;
                nuevoUsuario.fechaCreacion = this.commonAdapterService.dateToJHILocalDate(new Date());

                this.usuarioService.create(nuevoUsuario).subscribe((result) => {
                    this.router.navigate(['/']);
                });
            });
        }
    }

    confirmarClave(): boolean {
        const clave = this.formulario.get('clave').value;
        const confirmacionClave = this.formulario.get('confirmacionClave').value;

        if (confirmacionClave === clave) {
            return true;
        } else {
            this.showSnackBar('Las contraseñas no son iguales.', 'Confirmación de contraseña');
            return false;
        }
    }

    showSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 15000,
        });
    }

}
