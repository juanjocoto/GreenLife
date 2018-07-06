import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonAdapterService} from '../../shared/services/common-adapter.service';
import { MatDialog } from '@angular/material';
import {Local, LocalService} from '../../../entities/local';
import {Comercio, ComercioService} from '../../../entities/comercio';
import {Fotografia, FotografiaService} from '../../../entities/fotografia';
import {LocalEliminarComponent} from '../../dialogos/local-eliminar/local-eliminar.component';

@Component({
    selector: 'jhi-comercios-locales',
    templateUrl: './comercios-locales.component.html',
    styleUrls: [
        'comercios-locales.component.scss'
    ]
})
export class ComerciosLocalesComponent implements OnInit {

    comercio: Comercio;
    locales: Local[];
    currentLocal: Local;

    // Google Maps default configuration
    zoom = 8.2;
    // Default Latitude and Longitude (San Jose, Costa Rica)
    lat = 9.935354;
    long = -84.082753;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private commonAdapterService: CommonAdapterService,
        private localEliminarDialog: MatDialog,
        private localService: LocalService,
        private comercioService: ComercioService,
        private fotografiaService: FotografiaService
    ) {}

    ngOnInit() {
        this.loadComercio();
        this.loadLocales();
    }

    addLocal() {
        this.router.navigate(['app/comercios/' + this.comercio.id + '/local/agregar']);
    }

    editLocal() {
        this.router.navigate(['app/comercios/' + this.comercio.id + '/local/editar/' + this.currentLocal.id]);
    }

    deleteLocal() {
        const dialogRef = this.localEliminarDialog.open(LocalEliminarComponent, {
            width: '455px',
            data: {
                localId: this.currentLocal.id,
                comercioId: this.comercio.id
            }
        });
    }

    private loadComercio() {
        this.route.params.subscribe((params) => {
            this.comercioService.find(params['comercioId']).subscribe((comercioResponse: HttpResponse<Comercio>) => {
                this.comercio = comercioResponse.body;
            });
        });
    }

    private loadLocales() {
        this.route.params.subscribe((params) => {
            this.localService.findByComercio(params['comercioId']).subscribe((locales) => {
                this.locales = locales.body;
            });
        });
    }

    loadCurrentLocal(idLocal: number) {
        this.localService.find(idLocal).subscribe((localResponse: HttpResponse<Local>) => {
            this.currentLocal = localResponse.body;
        });
    }

}
