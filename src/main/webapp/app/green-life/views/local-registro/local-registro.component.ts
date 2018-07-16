import {ActivatedRoute, Router} from '@angular/router';
import {Comercio, ComercioService} from '../../../entities/comercio';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Fotografia, FotografiaService} from '../../../entities/fotografia';
import {Local, LocalService} from '../../../entities/local';

import {CargaImagenesComponent} from '../../dialogos/carga-imagenes/carga-imagenes.component';
import {CommonAdapterService} from '../../shared/services/common-adapter.service';
import {HttpResponse} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {MouseEvent} from '@agm/core';
import {SERVER_API_URL} from '../../../app.constants';

@Component({
    selector: 'jhi-local-registro',
    templateUrl: './local-registro.component.html',
    styleUrls: [
        'local-registro.component.scss'
    ]
})
export class LocalRegistroComponent implements OnInit {

    formLocales: FormGroup;
    comercio: Comercio;
    newLocal: Local;
    newFachada: Fotografia;
    hostPath = SERVER_API_URL;

    // Google Maps default configuration
    zoom = 7.5;
    // Default Latitude and Longitude (San Jose, Costa Rica)
    lat = 9.935354;
    long = -84.082753;
    // Local marker
    marker: Marker = {
        lat: this.lat,
        long: this.long
    };

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private commonAdapterService: CommonAdapterService,
        private dialog: MatDialog,
        private localService: LocalService,
        private comercioService: ComercioService,
        private fotografiaService: FotografiaService
    ) {
    }

    ngOnInit() {
        this.formLocales = this.formBuilder.group({
            nombre: ['', [
                Validators.required
            ]],
            telefono: ['', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(8)
            ]],
            direccion: ['', [
                Validators.required
            ]],
            horaApertura: ['', [
                Validators.required
            ]],
            horaCierre: ['', [
                Validators.required
            ]]
        });

        this.route.params.subscribe((params) => {
            this.loadComercio(params['comercioId']);
        });

        this.newLocal = new Local();
        this.newFachada = new Fotografia();
    }

    createLocal() {
        this.newLocal.nombre = this.formLocales.get('nombre').value;
        this.newLocal.telefono = this.formLocales.get('telefono').value;
        this.newLocal.direccion = this.formLocales.get('direccion').value;
        this.newLocal.horario = this.formatHorario(
            this.formLocales.get('horaApertura').value,
            this.formLocales.get('horaCierre').value
        );
        this.newLocal.latitud = this.marker.lat;
        this.newLocal.longitud = this.marker.long;
        this.newLocal.comercioId = this.comercio.id;
        this.newLocal.comercioRazonSocial = this.comercio.razonSocial;

        if (this.formLocales.valid) {
            this.newLocal.fechaCreacion = this.commonAdapterService.dateToJHILocalDate(new Date());

            this.localService.create(this.newLocal).subscribe((result) => {
                this.formLocales.reset();
                this.router.navigate(['app/comercios/' + this.comercio.id + '/locales']);
            });
        }
    }

    private loadComercio(id) {
        this.comercioService.find(id).subscribe((comercioResponse: HttpResponse<Comercio>) => {
            this.comercio = comercioResponse.body;
        });
    }

    private formatHorario(horaApertura: string, horaCierre: string): string {
        return horaApertura + ' a ' + horaCierre;
    }

    cancel() {
        this.formLocales.reset();
        this.router.navigate(['app/comercios/' + this.comercio.id + '/locales']);
    }

    openImageDialog() {
        this.dialog.open(CargaImagenesComponent).afterClosed().subscribe((imageName: string) => {
            if (imageName) {
                this.newFachada.comercioId = this.comercio.id;
                this.newFachada.urlImage = `/api/images/${imageName}`;

                this.fotografiaService.create(this.newFachada).subscribe((httpResponse) => {
                    this.newLocal.fachadaId = httpResponse.body.id;
                    console.log(httpResponse.body);
                });
            }
        });
    }

    // Google Maps methods
    markerDragEnd($event: MouseEvent) {
        this.marker.lat = $event.coords.lat;
        this.marker.long = $event.coords.lng;
    }

}

// Google Maps marker interface
interface Marker {
    lat: number;
    long: number;
}
