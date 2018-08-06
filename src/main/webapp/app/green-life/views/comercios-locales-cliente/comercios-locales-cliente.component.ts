import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {CommonAdapterService} from '../../shared/services/common-adapter.service';
import {Comercio, ComercioService} from '../../../entities/comercio';
import {Local, LocalService} from '../../../entities/local';

@Component({
    selector: 'jhi-comercios-locales-cliente',
    templateUrl: './comercios-locales-cliente.component.html',
    styleUrls: [
        'comercios-locales-cliente.component.scss'
    ]
})
export class ComerciosLocalesClienteComponent implements OnInit {

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
        private localService: LocalService,
        private comercioService: ComercioService
    ) {}

    ngOnInit() {
        this.loadComercio();
        this.loadLocales();
    }

    loadCurrentLocal(idLocal: number) {
        this.localService.find(idLocal).subscribe((localResponse: HttpResponse<Local>) => {
            this.currentLocal = localResponse.body;
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

}
