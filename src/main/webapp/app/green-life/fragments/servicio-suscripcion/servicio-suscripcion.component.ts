import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {TIPO_SERVICIO_SUSCRIPCION} from '../../../app.constants';
import {CommonAdapterService} from '../../shared/services/common-adapter.service';
import {ConfirmacionDialogComponent} from '../../dialogos/confirmacion-dialog/confirmacion-dialog.component';
import {UsuarioService} from '../../../entities/usuario';
import {AccountService} from '../../../shared';
import {Comercio, ComercioService} from '../../../entities/comercio';
import {Contrato, ContratoService} from '../../../entities/contrato';
import {TipoContratoService} from '../../../entities/tipo-contrato';

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
    isContratoActivo = false;
    isPagando = false;
    paymentStatus = false;
    amount = 0;
    description = '';

    constructor(
        private commonAdapterService: CommonAdapterService,
        private account: AccountService,
        private usuarioService: UsuarioService,
        private comercioService: ComercioService,
        private contratoService: ContratoService,
        private tipoContratoService: TipoContratoService,
        private matDialog: MatDialog
    ) {}

    ngOnInit() {
        this.loadComercios();
        this.verificarServicioSuscripcion();
    }

    solicitarContratoServicioSuscripcion() {
        const ref = this.matDialog.open(ConfirmacionDialogComponent);
        ref.componentInstance.texto = `¿Está seguro que desea activar el servicio de suscripciones?`;
        ref.afterClosed().subscribe((result) => {
            if (result && this.isContratoActivo === false) {
                for (const comercio of this.comercios) {
                    this.newContrato = new Contrato();
                    this.newContrato.tipoId = TIPO_SERVICIO_SUSCRIPCION;
                    this.newContrato.comercioId = comercio.id;
                    this.newContrato.fechaCreacion = this.commonAdapterService.dateToJHILocalDate(new Date());

                    this.contratoService.create(this.newContrato).subscribe((responseContrato) => {
                        this.isContratoActivo = responseContrato.status === 201;
                    });
                }
            }
        });
    }

    cancelarContratoServicioSuscripcion() {
        const ref = this.matDialog.open(ConfirmacionDialogComponent);
        ref.componentInstance.texto = `¿Está seguro que desea cancelar el servicio de suscripciones?`;
        ref.afterClosed().subscribe((result) => {
            if (result && this.isContratoActivo === true) {
                for (const comercio of this.comercios) {
                    this.contratoService.findAllByComercio(comercio.id).subscribe((responseContratos) => {
                        if (responseContratos.body.length > 0) {
                            for (const contrato of responseContratos.body) {
                                if (contrato.tipoId === TIPO_SERVICIO_SUSCRIPCION) {
                                    this.contratoService.delete(contrato.id).subscribe((responseDelContrato) => {
                                        if (responseDelContrato.status === 200) {
                                            this.isContratoActivo = false;
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            }
        });
    }

    pagarServicioSuscripcion() {
        this.isPagando = true;
    }

    cancelarPago() {
        this.isPagando = false;
    }

    verifyPaymentStatus($event) {
        setTimeout(() => {
            this.paymentStatus = $event;
            this.isPagando = false;
        }, 13000);
    }

    verificarServicioSuscripcion() {
        this.account.get().subscribe((accountResponse) => {
            this.usuarioService.findByUserLogin(accountResponse.body['login']).subscribe((responseUser) => {
                this.comercioService.findComerciosByDueno(responseUser.body.id).subscribe((responseComercio) => {
                    for (const comercio of responseComercio.body) {
                        this.contratoService.findAllByComercio(comercio.id).subscribe((responseContratos) => {
                            if (responseContratos.body.length > 0) {
                                for (const contrato of responseContratos.body) {
                                    if (contrato.tipoId === TIPO_SERVICIO_SUSCRIPCION) {
                                        this.isContratoActivo = true;
                                        this.setPayment();
                                    }
                                }
                            } else {
                                this.isContratoActivo = false;
                            }
                        });
                    }
                });
            });
        });
    }

    setPayment() {
        this.tipoContratoService.find(TIPO_SERVICIO_SUSCRIPCION).subscribe((responseTipoContrato) => {
            this.amount = responseTipoContrato.body.costo;
            this.description = responseTipoContrato.body.nombre;
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
