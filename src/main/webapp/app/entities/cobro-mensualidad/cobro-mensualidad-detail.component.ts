import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CobroMensualidad } from './cobro-mensualidad.model';
import { CobroMensualidadService } from './cobro-mensualidad.service';

@Component({
    selector: 'jhi-cobro-mensualidad-detail',
    templateUrl: './cobro-mensualidad-detail.component.html'
})
export class CobroMensualidadDetailComponent implements OnInit, OnDestroy {

    cobroMensualidad: CobroMensualidad;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cobroMensualidadService: CobroMensualidadService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCobroMensualidads();
    }

    load(id) {
        this.cobroMensualidadService.find(id)
            .subscribe((cobroMensualidadResponse: HttpResponse<CobroMensualidad>) => {
                this.cobroMensualidad = cobroMensualidadResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCobroMensualidads() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cobroMensualidadListModification',
            (response) => this.load(this.cobroMensualidad.id)
        );
    }
}
