import { Component, OnInit } from '@angular/core';
import { Comercio } from '../../../entities/comercio';
import { ComercioService } from './../../../entities/comercio/comercio.service';
import {User} from '../../../shared';
import { UserService } from './../../../shared/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {JhiAlertService} from 'ng-jhipster';
import {Observable} from '../../../../../../../node_modules/rxjs';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Usuario, UsuarioService} from '../../../entities/usuario';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ComerciosRegistroComponent} from '../../dialogos/comercios-registro/comercios-registro.component';
import {ConfirmacionDialogComponent} from '../../dialogos/confirmacion-dialog/confirmacion-dialog.component';
import {EtiquetasConsultarComponent} from '../../dialogos/etiquetas-consultar/etiquetas-consultar.component';
import {AccountService} from '../../../shared/auth/account.service';

@Component({
  selector: 'jhi-configuracion-comercios',
  templateUrl: './configuracion-comercios.component.html',
  styleUrls: ['./configuracion-comercios.component.scss']
})
export class ConfiguracionComerciosComponent implements OnInit {

  comercios: IComercio[] = [];
  currentSearch: string;
  user: User;
  usuario: Usuario;

  constructor(
      private comercioService: ComercioService,
      private route: ActivatedRoute,
      private router: Router,
      private jhiAlertService: JhiAlertService,
      private userService: UserService,
      private usuarioService: UsuarioService,
      private matDialog: MatDialog,
      private matSnackBar: MatSnackBar,
      private account: AccountService) {}

  ngOnInit() {
      this.route.params.subscribe((params) => {
          if (params && params.login) {
              this.getComercios(this.usuarioService.findByUserLogin(params.login), this.userService.find(params.login));
          } else {
              this.account.get().subscribe((httpResponse) => {
                  this.getComercios(this.usuarioService.findByUserLogin(httpResponse.body['login']), this.userService.find(httpResponse.body['login']));
              });
          }
      });
  }

  getComercios(observableUsuario: Observable<HttpResponse<Usuario>>, observableUser: Observable<HttpResponse<User>>): void {
      Observable.zip(observableUsuario, observableUser).subscribe((resul) => {
          this.usuario = resul[0].body;
          this.user = resul[1].body;

          this.comercioService.findComerciosByDueno(this.usuario.id).subscribe((comercioResponse: HttpResponse<Comercio[]>) => {
              for (const index of comercioResponse.body) {
                  this.comercios.push({
                      comercio: index
                  });
              }
          });
      });
  }

  agregarComercio() {
      const diagRef = this.matDialog.open(ComerciosRegistroComponent);
      diagRef.componentInstance.dueno = this.usuario;
      diagRef.afterClosed().subscribe((res) => {
         if (res) {
             this.comercios.push({
                 comercio: res
             });
         }
      });
  }

  eliminarComercio(comercio: Comercio) {
      const ref = this.matDialog.open(ConfirmacionDialogComponent);
      ref.componentInstance.texto = `¿Desea eliminar el comercio ${comercio.razonSocial}?`;
      ref.afterClosed().subscribe((result) => {
          if (result) {
              this.comercioService.delete(comercio.id).subscribe((httpResponse) => {
                  this.matSnackBar.open(`El comercio ${comercio.razonSocial} fue eliminado`, undefined, {duration: 2000});
              });
          }
      });
  }

  consultarEtiquetas(pcomercio: Comercio) {
      console.log('id del comercio: ' + pcomercio.id);
      const ref = this.matDialog.open(EtiquetasConsultarComponent, {
         width: '500px',
         data: pcomercio.id
      });
  }
}

interface IComercio {
    comercio: Comercio;
}
