import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { User } from '../../../shared';
import { UserService } from './../../../shared/user/user.service';
import { Usuario } from '../../../entities/usuario';
import { UsuarioService } from './../../../entities/usuario/usuario.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'jhi-usuario-modificar',
  templateUrl: './usuario-modificar.component.html',
  styleUrls: ['./usuario-modificar.component.scss']
})
export class UsuarioModificarComponent implements OnInit {

    usuario: Usuario;
    user: User;
    formulario: FormGroup;

  constructor(
      private usuarioService: UsuarioService,
      private userService: UserService,
      private route: ActivatedRoute,
      private formBuilder: FormBuilder,
      private router: Router) { }

  ngOnInit() {
      this.getUser();
  }

  getUser(): void {
      this.route.params.subscribe((params) => {
          const usuario = this.usuarioService.findByUserLogin(params.login);
          const user = this.userService.find(params.login);

          Observable.zip(usuario, user).subscribe((resul) => {
              this.usuario = resul[0].body;
              this.user = resul[1].body;

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
                  latitud: [this.usuario.latitud, [
                      Validators.minLength(1),
                      Validators.pattern('^[-.0-9]*$')
                  ]],
                  longitud: [this.usuario.longitud, [
                      Validators.minLength(1),
                      Validators.pattern('^[-.0-9]*$')
                  ]],
                  usuario: [this.user.login, [
                      Validators.required
                  ]]
              });
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
      this.usuario.latitud = this.formulario.get('latitud').value;
      this.usuario.fechaNacimiento = this.convertirFecha(new Date(this.formulario.get('fechaNacimiento').value));
      this.usuario.longitud = this.formulario.get('longitud').value;

      if (this.formulario.valid) {
          this.userService.update(this.user).subscribe((result) => {
              console.log(result);
              this.usuario.fechaCreacion = this.convertirFecha(new Date());

              this.usuarioService.update(this.usuario).subscribe((resuld) => {
                  console.log(resuld);
              });
          });
      }
  }

  private convertirFecha(value: Date, args?: any): any {
        return {
            year: value.getFullYear(),
            month: value.getMonth() + 1,
            day: value.getDay()
        };
  }
}
