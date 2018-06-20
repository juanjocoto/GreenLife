import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SolicitudSuscripcion } from './solicitud-suscripcion.model';
import { SolicitudSuscripcionService } from './solicitud-suscripcion.service';

@Component({
    selector: 'jhi-solicitud-suscripcion-detail',
    templateUrl: './solicitud-suscripcion-detail.component.html'
})
export class SolicitudSuscripcionDetailComponent implements OnInit, OnDestroy {

    solicitudSuscripcion: SolicitudSuscripcion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private solicitudSuscripcionService: SolicitudSuscripcionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSolicitudSuscripcions();
    }

    load(id) {
        this.solicitudSuscripcionService.find(id)
            .subscribe((solicitudSuscripcionResponse: HttpResponse<SolicitudSuscripcion>) => {
                this.solicitudSuscripcion = solicitudSuscripcionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSolicitudSuscripcions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'solicitudSuscripcionListModification',
            (response) => this.load(this.solicitudSuscripcion.id)
        );
    }
}
