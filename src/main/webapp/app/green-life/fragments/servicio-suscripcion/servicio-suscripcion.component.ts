import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {TIPO_SERVICIO_SUSCRIPCION} from '../../../app.constants';
import {CommonAdapterService} from '../../shared/services/common-adapter.service';
import {ConfirmacionDialogComponent} from '../../dialogos/confirmacion-dialog/confirmacion-dialog.component';
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
        private tipoContratoService: TipoContratoService,
        private matDialog: MatDialog,
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

    private loadComercios() {
        this.account.get().subscribe((accountResponse) => {
            this.usuarioService.findByUserLogin(accountResponse.body['login']).subscribe((responseUser) => {
                this.comercioService.findComerciosByDueno(responseUser.body.id).subscribe((responseComercio) => {
                    this.comercios = responseComercio.body;
                });
            });
        });
    }

    // TODO AGREGAR TIPO DE CONTRATO POR DEFAULT EN LIQUIBASE
    /*   solicitarContratoServicioSuscripcion() {
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
       }*/

}
