import { Component, OnInit } from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {CommonAdapterService} from '../../shared/services/common-adapter.service';
import {Suscripcion, SuscripcionService} from '../../../entities/suscripcion';
import {Comercio, ComercioService} from '../../../entities/comercio';
import {Usuario, UsuarioService} from '../../../entities/usuario';
import {User, UserService} from '../../../shared';
import {Observable} from '../../../../../../../node_modules/rxjs';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'jhi-suscripciones-comercio',
  templateUrl: './suscripciones-comercio.component.html',
  styleUrls: ['./suscripciones-comercio.component.scss']
})
export class SuscripcionesComercioComponent implements OnInit {

    panelOpenState = false;
    suscripciones: ISuscripcion[] = [];
    cliente: Usuario;
    user: User;
    comercio: Comercio;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private commonAdapterService: CommonAdapterService,
      private suscripcionService: SuscripcionService,
      private comercioService: ComercioService,
      private usuarioService: UsuarioService,
      private userService: UserService
  ) { }

  ngOnInit() {
      this.route.params.subscribe((params) => {
          this.loadComercio(params['comercioId']);
          this.loadSuscripcionesComercio(params['comercioId']);
      });
  }

  private loadComercio(comercioId) {
      const comercio = this.comercioService.find(comercioId);

      Observable.zip(comercio).subscribe((resul) => {
          this.comercio = resul[0].body;
      });
  }

  private loadSuscripcionesComercio(comercioId) {
      this.suscripcionService.findSuscripcionesByComercio(comercioId).subscribe((suscripcionResponse: HttpResponse<Suscripcion[]>) => {
          for (const index of suscripcionResponse.body) {
              console.log(index.usuarioId);
              this.usuarioService.find(index.usuarioId).subscribe((usuarioResponse: HttpResponse<Usuario>) => {
                  console.log(usuarioResponse.body.userDetailId);
                  this.userService.findById(usuarioResponse.body.userDetailId).subscribe((userResponse: HttpResponse<User>) => {
                      console.log(userResponse.body.firstName);
                      this.suscripciones.push({
                          suscripcion: index,
                          cliente: usuarioResponse.body,
                          user: userResponse.body
                      });
                  });
              });
          }
      });
  }

}

interface ISuscripcion {
    suscripcion: Suscripcion;
    cliente: Usuario;
    user: User;
}
