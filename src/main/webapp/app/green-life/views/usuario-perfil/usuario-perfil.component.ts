import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ComerciosRegistroComponent } from '../../dialogos/comercios-registro/comercios-registro.component';
import { MatDialog } from '@angular/material';
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
    private route: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog
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

  modificarUsuario() {
      this.router.navigate(['app/usuario/' + this.user.login + '/editar']);
  }

  openComercioDialog() {
    const ref = this.matDialog.open(ComerciosRegistroComponent);

    ref.afterClosed().subscribe((resul) => {
      if (resul) {
        this.router.navigate([`/app/comercios/${resul}/editar`]);
      }
    });

    ref.componentInstance.dueno = this.usuario;
  }
}
