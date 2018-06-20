import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OrdenRecoleccion } from './orden-recoleccion.model';
import { OrdenRecoleccionService } from './orden-recoleccion.service';

@Component({
    selector: 'jhi-orden-recoleccion-detail',
    templateUrl: './orden-recoleccion-detail.component.html'
})
export class OrdenRecoleccionDetailComponent implements OnInit, OnDestroy {

    ordenRecoleccion: OrdenRecoleccion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ordenRecoleccionService: OrdenRecoleccionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrdenRecoleccions();
    }

    load(id) {
        this.ordenRecoleccionService.find(id)
            .subscribe((ordenRecoleccionResponse: HttpResponse<OrdenRecoleccion>) => {
                this.ordenRecoleccion = ordenRecoleccionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrdenRecoleccions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ordenRecoleccionListModification',
            (response) => this.load(this.ordenRecoleccion.id)
        );
    }
}
