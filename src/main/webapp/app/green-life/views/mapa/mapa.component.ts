import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AccountService} from '../../../shared/auth/account.service';
import {Comercio, TipoComercio} from '../../../entities/comercio/comercio.model';
import {ComercioService} from '../../../entities/comercio/comercio.service';
import {GMAP_DEFAULT_SETTINGS} from '../../../app.constants';
import {Local} from '../../../entities/local/local.model';
import {LocalService} from '../../../entities/local/local.service';
import {MatSlider} from '@angular/material';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: ['mapa.component.scss']
})
export class MapaComponent implements OnInit {

    @ViewChild('slider') slider: MatSlider;

    comercioFG = new FormControl();

    // Google Maps default configuration
    zoom = GMAP_DEFAULT_SETTINGS.zoom;
    // Default Latitude and Longitude (San Jose, Costa Rica)
    defaultCoordinates: Coords = {
        lat: GMAP_DEFAULT_SETTINGS.lat,
        lng: GMAP_DEFAULT_SETTINGS.long
    };

    currentLocation: Coords = {
        lat: this.defaultCoordinates.lat,
        lng: this.defaultCoordinates.lng
    };
    cameraLocation: Coords = {
        lat: this.defaultCoordinates.lat,
        lng: this.defaultCoordinates.lng
    };
    circleLocation: Coords = {
        lat: this.currentLocation.lat,
        lng: this.currentLocation.lng
    };

    showFilter = false;

    account: Account;

    comercioList: Comercio[] = [];
    localList: Local[] = [];
    comercioMap: Map<number, Comercio> = new Map();

    filteredOptions: Observable<string[]>;

    // Modidificar por la ubicación del icono final
    iconUrl = undefined; // `/api/images/bitmap.png`;

    tipos = [];
    tipoPrecios = ['Bajos', 'Medio', 'Altos'];
    selectedTipo: string;
    selectedPrecio: string;
    selectedCalificacion: string;

    constructor(
        private localService: LocalService,
        private comercioService: ComercioService,
        private accountService: AccountService
    ) {}

    ngOnInit() {
        this.accountService.get().subscribe(
            (httpresponse) => this.account = httpresponse.body,
            (err) => this.account = undefined
        );
        const distance = parseFloat(this.slider.value.toString()) * 1000;

        navigator.geolocation.getCurrentPosition((position) => {
            this.currentLocation.lat = position.coords.latitude;
            this.currentLocation.lng = position.coords.longitude;

            this.circleLocation.lat = position.coords.latitude;
            this.circleLocation.lng = position.coords.longitude;

            this.cameraLocation.lat = position.coords.latitude;
            this.cameraLocation.lng = position.coords.longitude;

            this.zoom = 14;

            this.updateList();
        }, (err) => {
            this.updateList();
        });

        this.loadTipos();
    }

    updateLocation(data: { coords: Coords }) {
        this.currentLocation = data.coords;
        this.circleLocation = data.coords;

        this.updateList();
    }

    updateList() {
        const distance = parseFloat(this.slider.value.toString()) * 1000;
        Observable.zip(
            this.comercioService.findAll(),
            this.localService.getByDistance(this.currentLocation.lat, this.currentLocation.lng, distance)
        ).subscribe((response) => {
            this.comercioList = response[0].body;
            for (const comercio of this.comercioList) {
                this.comercioMap.set(comercio.id, comercio);
            }
            this.localList = response[1].body;
        });

        this.selectedTipo = null;
        this.selectedPrecio = null;
    }

    onMapReady(event) {
        this.showFilter = true;
    }

    private filter(value: string) {
        const filterValue = value.toLowerCase();

        return this.comercioList
            .map((comercio) => comercio.nombreComercial)
            .filter((option) => option.toLowerCase().includes(filterValue));
    }

    filterByTipo() {
        if (this.selectedTipo === 'Todos') {
            Observable.zip(
                this.comercioService.findAll(),
                this.localService.getAll()
            ).subscribe((response) => {
                this.comercioList = response[0].body;

                for (const comercio of this.comercioList) {
                    this.comercioMap.set(comercio.id, comercio);
                }
                this.localList = response[1].body;
            });
        } else {
            this.localList = [];
            this.comercioService.findComerciosByTipo(TipoComercio[this.selectedTipo]).subscribe((comercioResponse: HttpResponse<Comercio[]>) => {
                this.comercioList = comercioResponse.body;

                for (const comercio of comercioResponse.body) {
                    this.comercioMap.set(comercio.id, comercio);
                    this.localService.findByComercio(comercio.id).subscribe((localResponse: HttpResponse<Local[]>) => {
                        for (const local of localResponse.body) {
                            this.localList.push(local);
                        }
                    });
                }
            });
        }
        this.selectedPrecio = null;
    }

    filterByPrecio() {
        if (this.selectedPrecio === 'Todos') {
            Observable.zip(
                this.comercioService.findAll(),
                this.localService.getAll()
            ).subscribe((response) => {
                this.comercioList = response[0].body;

                for (const comercio of this.comercioList) {
                    this.comercioMap.set(comercio.id, comercio);
                }
                this.localList = response[1].body;
            });
        } else {
            this.localList = [];
            let tipo = '';
            switch (this.selectedPrecio) {
                case this.tipoPrecios[0]: tipo = 'Low';
                break;
                case this.tipoPrecios[1]: tipo = 'Mild';
                break;
                case this.tipoPrecios[2]: tipo = 'High';
                break;
            }
            this.comercioService.findByRange(tipo).subscribe((comercioResponse) => {
                this.comercioList = comercioResponse.body;
                for (const comercio of comercioResponse.body) {
                    this.comercioMap.set(comercio.id, comercio);
                    this.localService.findByComercio(comercio.id).subscribe((localResponse: HttpResponse<Local[]>) => {
                        for (const local of localResponse.body) {
                            this.localList.push(local);
                        }
                    });
                }
            });
        }
        this.selectedTipo = null;
    }

    filterByCalificacion() {
        if (this.selectedCalificacion === 'Todos') {
            Observable.zip(
                this.comercioService.findAll(),
                this.localService.getAll()
            ).subscribe((response) => {
                this.comercioList = response[0].body;

                for (const comercio of this.comercioList) {
                    this.comercioMap.set(comercio.id, comercio);
                }
                this.localList = response[1].body;
            });
        } else {
            this.localList = [];
            console.log(this.selectedCalificacion);
            this.comercioService.findByScore(this.selectedCalificacion).subscribe((comercioResponse) => {
                this.comercioList = comercioResponse.body;
                for (const comercio of comercioResponse.body) {
                    this.comercioMap.set(comercio.id, comercio);
                    this.localService.findByComercio(comercio.id).subscribe((localResponse: HttpResponse<Local[]>) => {
                        for (const local of localResponse.body) {
                            this.localList.push(local);
                        }
                    });
                }
            });
        }
        this.selectedTipo = null;
    }

    loadTipos() {
        const objectEnum = Object.keys(TipoComercio);

        for (let i = 0; i < objectEnum.length; i++) {
            this.tipos.push({key: objectEnum[i], value: objectEnum[i]});
        }
    }

}

interface Coords {
    lat: number;
    lng: number;
}
