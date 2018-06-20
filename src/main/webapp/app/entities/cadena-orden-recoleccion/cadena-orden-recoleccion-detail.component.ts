import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CadenaOrdenRecoleccion } from './cadena-orden-recoleccion.model';
import { CadenaOrdenRecoleccionService } from './cadena-orden-recoleccion.service';

@Component({
    selector: 'jhi-cadena-orden-recoleccion-detail',
    templateUrl: './cadena-orden-recoleccion-detail.component.html'
})
export class CadenaOrdenRecoleccionDetailComponent implements OnInit, OnDestroy {

    cadenaOrdenRecoleccion: CadenaOrdenRecoleccion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cadenaOrdenRecoleccionService: CadenaOrdenRecoleccionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCadenaOrdenRecoleccions();
    }

    load(id) {
        this.cadenaOrdenRecoleccionService.find(id)
            .subscribe((cadenaOrdenRecoleccionResponse: HttpResponse<CadenaOrdenRecoleccion>) => {
                this.cadenaOrdenRecoleccion = cadenaOrdenRecoleccionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCadenaOrdenRecoleccions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cadenaOrdenRecoleccionListModification',
            (response) => this.load(this.cadenaOrdenRecoleccion.id)
        );
    }
}
