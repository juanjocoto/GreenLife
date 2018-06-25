import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { User } from '../../../shared';
import { UserService } from './../../../shared/user/user.service';
import { Usuario } from '../../../entities/usuario';
import { UsuarioService } from './../../../entities/usuario/usuario.service';

@Component({
  selector: 'jhi-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.scss']
})
export class UsuarioPerfilComponent implements OnInit {

  usuario: Usuario;
  user: User;

  constructor(
    private usuarioService: UsuarioService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {

      const usuario = this.usuarioService.findByUserLogin(params.login);
      const user = this.userService.find(params.login);

      Observable.zip(usuario, user).subscribe((resul) => {
        this.usuario = resul[0].body;
        this.user = resul[1].body;
      });
    });
  }
}
