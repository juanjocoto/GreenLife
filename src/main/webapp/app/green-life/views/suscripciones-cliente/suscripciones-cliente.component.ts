import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import {CommonAdapterService} from '../../shared/services/common-adapter.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ConfirmacionDialogComponent} from '../../dialogos/confirmacion-dialog/confirmacion-dialog.component';
import {Suscripcion, SuscripcionService, EstadoSuscripcion} from '../../../entities/suscripcion';
import {Comercio, ComercioService} from '../../../entities/comercio';
import {Usuario, UsuarioService} from '../../../entities/usuario';
import {User, UserService, AccountService} from '../../../shared';
import {TIPO_SERVICIO_SUSCRIPCION} from '../../../app.constants';
import {ContratoService} from '../../../entities/contrato';

@Component({
    selector: 'jhi-suscripciones-cliente',
    templateUrl: './suscripciones-cliente.component.html',
    styleUrls: [
        'suscripciones-cliente.component.scss'
    ]
})
export class SuscripcionesClienteComponent implements OnInit {

    suscripciones: ISuscripcion[] = [];
    cliente: Usuario;
    clienteDetail: User;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private commonAdapterService: CommonAdapterService,
        private account: AccountService,
        private cancelarSuscripcionDialog: MatDialog,
        private snackBar: MatSnackBar,
        private suscripcionService: SuscripcionService,
        private comercioService: ComercioService,
        private usuarioService: UsuarioService,
        private userService: UserService,
        private contratoService: ContratoService
    ) { }

    ngOnInit() {
        this.loadSuscripcionesUsuario();
        this.loadCliente();
    }

    cancelarSuscripcion(suscripcionId, comercioNombreComercial) {
        const ref = this.cancelarSuscripcionDialog.open(ConfirmacionDialogComponent);
        ref.componentInstance.texto = `¿Desea cancelar la suscripción del comercio ${comercioNombreComercial}?`;
        ref.afterClosed().subscribe((result) => {
            if (result) {
                this.suscripcionService.delete(suscripcionId).subscribe((httpResponse) => {
                    this.refreshPage();
                });
            }
        });
    }

    pagarSuscripcion(suscripcionId) {
        this.suscripcionService.find(suscripcionId).subscribe((res) => {
            if (res.body.estado === EstadoSuscripcion.VIGENTE) {
                this.router.navigate(['app/suscripciones/' + suscripcionId + '/pago']);
            } else {
                this.snackBar.open('Para realizar el pago, la suscripción debe de estar activa', undefined, { duration: 2000 });
            }
        });
    }

    loadPedidos(suscripcionId) {
        this.router.navigate(['app/suscripciones/' + suscripcionId + '/pedido']);
    }

    private loadCliente() {
        this.account.get().subscribe((accountResponse) => {
            this.usuarioService.findByUserLogin(accountResponse.body['login']).subscribe((usuarioResponse: HttpResponse<Usuario>) => {
                this.cliente = usuarioResponse.body;
                this.userService.find(accountResponse.body['login']).subscribe((userResponse: HttpResponse<User>) => {
                    this.clienteDetail = userResponse.body;
                });
            });
        });
    }

    private loadSuscripcionesUsuario() {
        this.account.get().subscribe((accountResponse) => {
            this.usuarioService.findByUserLogin(accountResponse.body['login']).subscribe((usuarioResponse: HttpResponse<Usuario>) => {
                this.suscripcionService.findSuscripcionesByUsuario(usuarioResponse.body.id).subscribe((suscripcionResponse: HttpResponse<Suscripcion[]>) => {
                    for (const index of suscripcionResponse.body) {
                        this.comercioService.find(index.comercioId).subscribe((comercioResponse: HttpResponse<Comercio>) => {
                            this.contratoService.findAllByComercio(comercioResponse.body.id).subscribe((responseContratos) => {
                                if (responseContratos.body.length > 0) {
                                    for (const contrato of responseContratos.body) {
                                        if (contrato.tipoId === TIPO_SERVICIO_SUSCRIPCION) {
                                            this.suscripciones.push({
                                                suscripcion: index,
                                                comercio: comercioResponse.body
                                            });
                                        }
                                    }
                                }
                            });
                        });
                    }
                });
            });
        });
    }

    private refreshPage() {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
            this.router.navigate(['app/suscripciones']));
    }

}

interface ISuscripcion {
    suscripcion: Suscripcion;
    comercio: Comercio;
}
