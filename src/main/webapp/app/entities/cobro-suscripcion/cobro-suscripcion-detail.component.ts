import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CobroSuscripcion } from './cobro-suscripcion.model';
import { CobroSuscripcionService } from './cobro-suscripcion.service';

@Component({
    selector: 'jhi-cobro-suscripcion-detail',
    templateUrl: './cobro-suscripcion-detail.component.html'
})
export class CobroSuscripcionDetailComponent implements OnInit, OnDestroy {

    cobroSuscripcion: CobroSuscripcion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cobroSuscripcionService: CobroSuscripcionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCobroSuscripcions();
    }

    load(id) {
        this.cobroSuscripcionService.find(id)
            .subscribe((cobroSuscripcionResponse: HttpResponse<CobroSuscripcion>) => {
                this.cobroSuscripcion = cobroSuscripcionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCobroSuscripcions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cobroSuscripcionListModification',
            (response) => this.load(this.cobroSuscripcion.id)
        );
    }
}
