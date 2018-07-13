import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CargaImagenesComponent } from '../../dialogos/carga-imagenes/carga-imagenes.component';
import { ComerciosRegistroComponent } from '../../dialogos/comercios-registro/comercios-registro.component';
import { CommonAdapterService } from '../../shared/services/common-adapter.service';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from './../../../app.constants';
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

  usuario: Usuario = new Usuario();
  user: User = new User();
  hostPath = `${SERVER_API_URL}/api/images/`;

  constructor(
    private usuarioService: UsuarioService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog,
    private commonAdapter: CommonAdapterService
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

  openImageDialog() {
    const ref = this.matDialog.open(CargaImagenesComponent);
    ref.afterClosed().subscribe((imageName: string) => {
      // this.usuario.fotoUrl = imageName;
      const usuarioUpdate = Object.assign(new Usuario(), this.usuario);
      usuarioUpdate.fotoUrl = imageName;
      usuarioUpdate.fechaCreacion = this.commonAdapter.dateToJHILocalDate(usuarioUpdate.fechaCreacion);
      usuarioUpdate.fechaNacimiento = this.commonAdapter.dateToJHILocalDate(usuarioUpdate.fechaNacimiento);
      this.usuarioService.update(usuarioUpdate).subscribe((httpResponse) => {
        this.usuario.fotoUrl = httpResponse.body.fotoUrl;
      });
    });
  }
}
