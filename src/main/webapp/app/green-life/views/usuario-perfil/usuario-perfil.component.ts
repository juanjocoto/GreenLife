import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private usuarioService: UsuarioService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.usuarioService.findByUserLogin(params.login).subscribe((resul) => {
        console.log(resul);
      });
      // this.userService.find(params.login).subscribe((resul) => {
      //   const user = resul.body;
      //   this.usuarioService.search({ userDetailId: user.id }).subscribe((a) => {
      //     console.log(a);
      //   });
      // });
    });
  }
}
