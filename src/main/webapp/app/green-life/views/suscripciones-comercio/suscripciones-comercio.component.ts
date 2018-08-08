import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {CommonAdapterService} from '../../shared/services/common-adapter.service';
import {Suscripcion, SuscripcionService} from '../../../entities/suscripcion';
import {Comercio, ComercioService} from '../../../entities/comercio';
import {Usuario, UsuarioService} from '../../../entities/usuario';
import {AccountService, User, UserService} from '../../../shared';
import {Observable} from '../../../../../../../node_modules/rxjs';
import {MatExpansionModule} from '@angular/material/expansion';
import {TIPO_SERVICIO_SUSCRIPCION} from '../../../app.constants';
import {ContratoService} from '../../../entities/contrato';

@Component({
    selector: 'jhi-suscripciones-comercio',
    templateUrl: './suscripciones-comercio.component.html',
    styleUrls: ['./suscripciones-comercio.component.scss']
})
export class SuscripcionesComercioComponent implements OnInit {

    panelOpenState = false;
    isContratoActivo = false;
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
        private userService: UserService,
        private account: AccountService,
        private contratoService: ContratoService
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.loadComercio(params['comercioId']);
            this.loadSuscripcionesComercio(params['comercioId']);
        });

        this.verificarServicioSuscripcion();
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
                this.usuarioService.find(index.usuarioId).subscribe((usuarioResponse: HttpResponse<Usuario>) => {
                    this.userService.findById(usuarioResponse.body.userDetailId).subscribe((userResponse: HttpResponse<User>) => {
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

    verificarServicioSuscripcion() {
        this.account.get().subscribe((accountResponse) => {
            this.usuarioService.findByUserLogin(accountResponse.body['login']).subscribe((responseUser) => {
                this.comercioService.findComerciosByDueno(responseUser.body.id).subscribe((responseComercio) => {
                    for (const comercio of responseComercio.body) {
                        this.contratoService.findByTipo(TIPO_SERVICIO_SUSCRIPCION).subscribe((responseContrato) => {
                            this.isContratoActivo = responseContrato.status === 200 && responseContrato.body.length > 0;
                        });
                    }
                });
            });
        });
    }

    activarServicioSuscripcion() {
        this.router.navigate(['app/miscomercios']);
    }

}

interface ISuscripcion {
    suscripcion: Suscripcion;
    cliente: Usuario;
    user: User;
}
