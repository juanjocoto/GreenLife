import {Component, OnInit, AfterContentInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {COSTO_SERVICIO_SUSCRIPCION} from '../../../app.constants';
import {CommonAdapterService} from '../../shared/services/common-adapter.service';
import {UsuarioService} from '../../../entities/usuario';
import {AccountService} from '../../../shared';
import {Comercio, ComercioService} from '../../../entities/comercio';
import {Contrato, ContratoService} from '../../../entities/contrato';
import {TipoContrato, TipoContratoService} from '../../../entities/tipo-contrato';

@Component({
    selector: 'jhi-servicio-suscripcion',
    templateUrl: './servicio-suscripcion.component.html',
    styleUrls: [
        'servicio-suscripcion.component.scss'
    ]
})
export class ServicioSuscripcionComponent implements OnInit {

    comercios: Comercio[];
    newContrato: Contrato;
    newTipoContrato: TipoContrato;
    isContratoActivo = false;

    constructor(
        private commonAdapterService: CommonAdapterService,
        private account: AccountService,
        private usuarioService: UsuarioService,
        private comercioService: ComercioService,
        private contratoService: ContratoService,
        private tipoContratoService: TipoContratoService
    ) {}

    ngOnInit() {
        this.loadComercios();
        this.verificarServicioSuscripcion();
    }

    solicitarContratoServicioSuscripcion() {
        if (this.isContratoActivo === false) {
            this.newTipoContrato = new TipoContrato();
            this.newTipoContrato.nombre = 'Servicio Suscripción';
            this.newTipoContrato.descripcion = 'Contrato por servicio de suscripción';
            this.newTipoContrato.costo = COSTO_SERVICIO_SUSCRIPCION;

            this.tipoContratoService.create(this.newTipoContrato).subscribe((responseTipoContrato) => {
                if (responseTipoContrato.status === 201) {
                    for (const comercio of this.comercios) {
                        this.newContrato = new Contrato();
                        this.newContrato.tipoId = responseTipoContrato.body.id;
                        this.newContrato.comercioId = comercio.id;
                        this.newContrato.fechaCreacion = this.commonAdapterService.dateToJHILocalDate(new Date());

                        this.contratoService.create(this.newContrato).subscribe((responseContrato) => {
                            if (responseContrato.status === 201) {
                                this.isContratoActivo = true;
                            }
                        });
                    }
                }
            });
        }
    }

    cancelarContratoServicioSuscripcion() {
    }

    verificarServicioSuscripcion() {
        this.account.get().subscribe((accountResponse) => {
            this.usuarioService.findByUserLogin(accountResponse.body['login']).subscribe((responseUser) => {
                this.comercioService.findComerciosByDueno(responseUser.body.id).subscribe((responseComercio) => {
                    for (const comercio of responseComercio.body) {
                        this.contratoService.find(comercio.id).subscribe((responseContrato) => {
                            if (responseContrato.status === 200) {
                                this.isContratoActivo = true;
                            } else {
                                this.isContratoActivo = false;
                            }
                        });
                    }
                });
            });
        });
    }

    private loadComercios() {
        this.account.get().subscribe((accountResponse) => {
            this.usuarioService.findByUserLogin(accountResponse.body['login']).subscribe((responseUser) => {
                this.comercioService.findComerciosByDueno(responseUser.body.id).subscribe((responseComercio) => {
                    this.comercios = responseComercio.body;
                });
            });
        });
    }

}
