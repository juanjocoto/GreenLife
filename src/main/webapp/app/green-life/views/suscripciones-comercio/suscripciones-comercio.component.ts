import { ActivatedRoute, Router } from '@angular/router';
import { Comercio, ComercioService } from '../../../entities/comercio';
import { CommonAdapterService, JHILocalDate } from '../../shared/services/common-adapter.service';
import { Component, OnInit } from '@angular/core';
import { EstadoSuscripcion, Suscripcion, SuscripcionService } from '../../../entities/suscripcion';
import { User, UserService } from '../../../shared';
import { Usuario, UsuarioService } from '../../../entities/usuario';

import { ConfirmacionDialogComponent } from '../../dialogos/confirmacion-dialog/confirmacion-dialog.component';
import { HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { Observable } from '../../../../../../../node_modules/rxjs';

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
        private route: ActivatedRoute,
        private suscripcionService: SuscripcionService,
        private comercioService: ComercioService,
        private usuarioService: UsuarioService,
        private userService: UserService,
        private matDialog: MatDialog
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.loadComercio(params['comercioId']);
            this.loadSuscripcionesComercio(params['comercioId']);
        });
    }

    aprobarSuscripcion(suscripcion) {
        const ref = this.matDialog.open(ConfirmacionDialogComponent);
        const nombreUsuario = `${suscripcion.user.firstName} ${suscripcion.user.lastName}`;
        ref.componentInstance.texto = `¿Desea aprobar la suscripción de ${nombreUsuario}?`;
        ref.afterClosed().subscribe((resul) => {
            if (resul) {
                const copy = Object.assign(new Suscripcion(), suscripcion.suscripcion) as Suscripcion;
                copy.estado = EstadoSuscripcion.VIGENTE;
                copy.fechaCreacion = new JHILocalDate(copy.fechaCreacion);
                copy.fechaCobro = new JHILocalDate(copy.fechaCobro);
                this.suscripcionService.update(copy).subscribe((httpReponse) => {
                    suscripcion.suscripcion = httpReponse.body;
                });
            }
        });
    }

    private loadComercio(comercioId) {
        this.comercioService.find(comercioId).subscribe((resul) => {
            this.comercio = resul.body;
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

}

interface ISuscripcion {
    suscripcion: Suscripcion;
    cliente: Usuario;
    user: User;
}
