import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Comercio, ComercioService } from '../../../entities/comercio';
import { ComerciosResenasComponent } from '../../dialogos/comercios-resenas/comercios-resenas.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'jhi-comercios-cliente',
    templateUrl: './comercios-cliente.component.html',
    styleUrls: [
        'comercios-cliente.component.scss'
    ]
})
export class ComerciosClienteComponent implements OnInit {

    comercios: Comercio[];
    currentComercio: Comercio;

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private comercioService: ComercioService,
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

    displayCurrentComercio(id) {
        this.comercioService.find(id).subscribe((comercioResponse: HttpResponse<Comercio>) => {
            this.currentComercio = comercioResponse.body;
        });
    }

    agregarResena(id) {
        this.dialog.open(ComerciosResenasComponent, {
            width: '500px',
            data: {comercioId: id}
        });
    }

    private loadComercios() {
        this.comercioService.findAll().subscribe((comercioResponse: HttpResponse<Comercio[]>) => {
            this.comercios = comercioResponse.body;
        });
    }
}
