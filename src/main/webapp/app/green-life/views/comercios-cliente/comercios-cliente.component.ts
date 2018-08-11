import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Comercio, ComercioService } from '../../../entities/comercio';
import { ComerciosResenasComponent } from '../../dialogos/comercios-resenas/comercios-resenas.component';
import { MatDialog } from '@angular/material';
import {TIPO_SERVICIO_SUSCRIPCION} from '../../../app.constants';
import {ContratoService} from '../../../entities/contrato';

@Component({
    selector: 'jhi-comercios-cliente',
    templateUrl: './comercios-cliente.component.html',
    styleUrls: [
        'comercios-cliente.component.scss'
    ]
})
export class ComerciosClienteComponent implements OnInit {

    comercios: Comercio[] = [];
    currentComercio: Comercio;

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private comercioService: ComercioService,
        private contratoService: ContratoService
    ) { }

    ngOnInit() {
        this.loadComercios();
    }

    verLocales(comercioId) {
        this.router.navigate(['app/comercios/' + comercioId + '/localescliente']);
    }

    suscribiriseComercio(comercioId) {
        this.router.navigate(['app/suscripcion/comercio/' + comercioId]);
    }

    displayCurrentComercio(comercioId) {
        this.currentComercio  = this.comercios.find((resulComercio) =>
            resulComercio.id === comercioId);
    }

    agregarResena(id) {
        this.dialog.open(ComerciosResenasComponent, {
            width: '500px',
            data: {comercioId: id}
        });
    }

    loadComercios() {
        this.comercioService.findAll().subscribe((comercioResponse: HttpResponse<Comercio[]>) => {
            for (const comercio of comercioResponse.body) {
                this.contratoService.findAllByComercio(comercio.id).subscribe((contratosResponse) => {
                    if (contratosResponse.body.length > 0) {
                        for (const contrato of contratosResponse.body) {
                            if (contrato.tipoId === TIPO_SERVICIO_SUSCRIPCION) {
                                comercio.contratos = [];
                                comercio.contratos.push(contrato);
                                this.comercios.push(comercio);
                            }
                        }
                    } else {
                        this.comercios.push(comercio);
                    }
                });
            }
        });
    }

}
