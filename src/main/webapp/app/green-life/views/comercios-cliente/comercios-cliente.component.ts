import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonAdapterService} from '../../shared/services/common-adapter.service';
import {Comercio, ComercioService} from '../../../entities/comercio';

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
        private route: ActivatedRoute,
        private commonAdapterService: CommonAdapterService,
        private comercioService: ComercioService,
    ) { }

    ngOnInit() {
        this.loadComercios();
    }

    verLocales(comercioId) {
        this.router.navigate(['app/comercios/' + comercioId + '/locales']);
    }

    suscribiriseComercio(comercioId) {
        this.router.navigate(['app/suscripcion/comercio/' + comercioId]);
    }

    displayCurrentComercio(id) {
        this.comercioService.find(id).subscribe((comercioResponse: HttpResponse<Comercio>) => {
            this.currentComercio = comercioResponse.body;
        });
    }

    private loadComercios() {
        this.comercioService.findAll().subscribe((comercioResponse: HttpResponse<Comercio[]>) => {
            this.comercios = comercioResponse.body;
            console.log(comercioResponse.body);
        });
    }
}
