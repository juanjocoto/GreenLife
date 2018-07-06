import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {MouseEvent} from '@agm/core';
import { CommonAdapterService } from '../../shared/services/common-adapter.service';
import {Local, LocalService} from '../../../entities/local';
import {Comercio, ComercioService} from '../../../entities/comercio';
import {Fotografia, FotografiaService} from '../../../entities/fotografia';

@Component({
    selector: 'jhi-local-modificar',
    templateUrl: './local-modificar.component.html',
    styleUrls: [
        'local-modificar.component.scss'
    ]
})
export class LocalModificarComponent implements OnInit {

    @Input() localId: number;
    formLocales: FormGroup;
    comercio: Comercio;
    local: Local;
    horaApertura: string;
    horaCierre: string;

    // Google Maps default configuration
    zoom = 11;
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
        private localService: LocalService,
        private comercioService: ComercioService,
        private fotografiaService: FotografiaService
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.loadComercio(params['comercioId']);
            this.loadLocal(params['localId']);
        });
    }

    editLocal() {
        this.local.nombre = this.formLocales.get('nombre').value;
        this.local.telefono = this.formLocales.get('telefono').value;
        this.local.direccion = this.formLocales.get('direccion').value;
        this.local.horario = this.formatHorario(
            this.formLocales.get('horaApertura').value,
            this.formLocales.get('horaCierre').value
        );
        this.local.latitud = this.marker.lat;
        this.local.latitude = this.marker.long;
        this.local.comercioId = this.comercio.id;
        this.local.comercioRazonSocial = this.comercio.razonSocial;

        if (this.formLocales.valid) {
            this.local.fechaCreacion = this.commonAdapterService.dateToJHILocalDate(new Date());

            this.localService.update(this.local).subscribe((result) => {
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

    private loadLocal(id) {
        this.localService.find(id).subscribe((localResponse: HttpResponse<Local>) => {
            this.local = localResponse.body;
            this.unformattedHorario(this.local.horario);
            this.marker.lat = this.local.latitud;
            this.marker.long = this.local.latitude;
            this.formLocales = this.formBuilder.group({
                nombre: [this.local.nombre, [
                    Validators.required
                ]],
                telefono: [this.local.telefono, [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(8)
                ]],
                direccion: [this.local.direccion, [
                    Validators.required
                ]],
                latitud: [this.local.latitud, [
                    Validators.required
                ]],
                longitud: [this.local.latitude, [
                    Validators.required
                ]],
                horaApertura: [this.horaApertura, [
                    Validators.required
                ]],
                horaCierre: [this.horaCierre, [
                    Validators.required
                ]]
            });
        });
    }

    private formatHorario(horaApertura: string, horaCierre: string): string {
        return horaApertura + ' a ' + horaCierre;
    }

    private unformattedHorario(horario: string) {
        this.horaApertura = horario.substring(0, 5);
        this.horaCierre = horario.substring(8, 13);
    }

    cancel() {
        this.formLocales.reset();
        this.router.navigate(['app/comercios/' + this.comercio.id + '/locales']);
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
