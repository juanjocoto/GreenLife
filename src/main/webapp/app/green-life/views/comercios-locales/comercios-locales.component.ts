import {Component, OnInit, Input} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {MouseEvent} from '@agm/core';
import {CommonAdapterService} from '../../shared/services/common-adapter.service';
import {Local, LocalService} from '../../../entities/local';
import {Comercio, ComercioService} from '../../../entities/comercio';
import {Fotografia, FotografiaService} from '../../../entities/fotografia';

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
        private localService: LocalService,
        private comercioService: ComercioService,
        private fotografiaService: FotografiaService
    ) {}

    ngOnInit() {
        this.loadComercio();
        this.loadLocales();
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
                console.log(locales.body);
            });
        });
    }

    // Google Maps methods
    loadCurrentLocal(idLocal: number) {
        this.localService.find(idLocal).subscribe((localResponse: HttpResponse<Local>) => {
            this.currentLocal = localResponse.body;
            console.log(this.currentLocal);
        });
    }

}
