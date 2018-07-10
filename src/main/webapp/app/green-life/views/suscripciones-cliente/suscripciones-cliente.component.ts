import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import {CommonAdapterService} from '../../shared/services/common-adapter.service';
import {MatDialog} from '@angular/material';
import {ConfirmacionDialogComponent} from '../../dialogos/confirmacion-dialog/confirmacion-dialog.component';
import {Suscripcion, SuscripcionService} from '../../../entities/suscripcion';
import {Comercio, ComercioService} from '../../../entities/comercio';
import {Usuario, UsuarioService} from '../../../entities/usuario';
import {User, UserService} from '../../../shared';

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
        private cancelarSuscripcionDialog: MatDialog,
        private suscripcionService: SuscripcionService,
        private comercioService: ComercioService,
        private usuarioService: UsuarioService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.loadUsuario(params['login']);
            this.loadSuscripcionesUsuario(params['login']);
        });
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

    loadPedidos(suscripcionId) {
        this.router.navigate(['app/suscripciones/' + suscripcionId + '/pedido']);
    }

    private loadUsuario(login) {
        this.usuarioService.findByUserLogin(login).subscribe((usuarioResponse: HttpResponse<Usuario>) => {
            this.cliente = usuarioResponse.body;
            this.userService.find(login).subscribe((userResponse: HttpResponse<User>) => {
                this.clienteDetail = userResponse.body;
            });
        });
    }

    private loadSuscripcionesUsuario(login) {
        this.usuarioService.findByUserLogin(login).subscribe((usuarioResponse: HttpResponse<Usuario>) => {
            this.suscripcionService.findSuscripcionesByUsuario(usuarioResponse.body.id).subscribe((suscripcionResponse: HttpResponse<Suscripcion[]>) => {
                for (const index of suscripcionResponse.body) {
                    this.comercioService.find(index.comercioId).subscribe((comercioResponse: HttpResponse<Comercio>) => {
                        this.suscripciones.push({
                            suscripcion: index,
                            comercio: comercioResponse.body
                        });
                    });
                }
            });
        });
    }

    private refreshPage() {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
            this.router.navigate(['app/usuario/' +  this.clienteDetail.login + '/suscripciones']));
    }

}

interface ISuscripcion {
    suscripcion: Suscripcion;
    comercio: Comercio;
}
