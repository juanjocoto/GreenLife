import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Suscripcion } from './suscripcion.model';
import { SuscripcionService } from './suscripcion.service';

@Component({
    selector: 'jhi-suscripcion-detail',
    templateUrl: './suscripcion-detail.component.html'
})
export class SuscripcionDetailComponent implements OnInit, OnDestroy {

    suscripcion: Suscripcion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private suscripcionService: SuscripcionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSuscripcions();
    }

    load(id) {
        this.suscripcionService.find(id)
            .subscribe((suscripcionResponse: HttpResponse<Suscripcion>) => {
                this.suscripcion = suscripcionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSuscripcions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'suscripcionListModification',
            (response) => this.load(this.suscripcion.id)
        );
    }
}
