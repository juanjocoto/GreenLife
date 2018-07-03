import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Usuario } from '../../../entities/usuario';
import { User } from '../../../shared';
import { ComerciosRegistroComponent } from '../../dialogos/comercios-registro/comercios-registro.component';
import { UsuarioService } from './../../../entities/usuario/usuario.service';
import { UserService } from './../../../shared/user/user.service';

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

  openComercioDialog() {
    const ref = this.matDialog.open(ComerciosRegistroComponent);

    ref.afterClosed().subscribe((resul) => {
      console.log(resul);
    });

    ref.componentInstance.dueno = this.usuario;
  }
}
