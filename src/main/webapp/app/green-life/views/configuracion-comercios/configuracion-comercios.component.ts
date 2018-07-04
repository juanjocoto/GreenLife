import { Component, OnInit } from '@angular/core';
import { Comercio } from '../../../entities/comercio';
import { ComercioService } from './../../../entities/comercio/comercio.service';
import {User} from '../../../shared';
import { UserService } from './../../../shared/user/user.service';
import {ActivatedRoute} from '@angular/router';
import {JhiAlertService} from 'ng-jhipster';
import {Observable} from '../../../../../../../node_modules/rxjs';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'jhi-configuracion-comercios',
  templateUrl: './configuracion-comercios.component.html',
  styleUrls: ['./configuracion-comercios.component.scss']
})
export class ConfiguracionComerciosComponent implements OnInit {

  comercios: Comercio[];
  currentSearch: string;
  user: User;

  constructor(
      private comercioService: ComercioService,
      private activatedRoute: ActivatedRoute,
      private jhiAlertService: JhiAlertService,
      private userService: UserService) {}

  ngOnInit() {
      this.getComercios();
  }

  getComercios(): void {
      this.activatedRoute.params.subscribe((params) => {
          const user = this.userService.find(params.login);

          Observable.zip(user).subscribe((resul) => {
              this.user = resul[0].body;

              console.log(params.login);
              console.log(this.user.id);

              this.comercioService.search(this.user.id).subscribe(
                  (res: HttpResponse<Comercio[]>) => this.comercios = res.body,
                  (res: HttpErrorResponse) => this.onError(res.message)
              );

              this.comercioService.query().subscribe(
                  (res: HttpResponse<Comercio[]>) => {
                      this.comercios = res.body;
                      this.currentSearch = '';
                  },
                  (res: HttpErrorResponse) => this.onError(res.message)
              );
          });
      });
  }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    agregarComercio() {

    }

    modificarComercio() {

    }

    eliminarComercio() {

    }
}
