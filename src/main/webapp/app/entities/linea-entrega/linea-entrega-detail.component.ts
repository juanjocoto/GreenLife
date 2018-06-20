import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { LineaEntrega } from './linea-entrega.model';
import { LineaEntregaService } from './linea-entrega.service';

@Component({
    selector: 'jhi-linea-entrega-detail',
    templateUrl: './linea-entrega-detail.component.html'
})
export class LineaEntregaDetailComponent implements OnInit, OnDestroy {

    lineaEntrega: LineaEntrega;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private lineaEntregaService: LineaEntregaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLineaEntregas();
    }

    load(id) {
        this.lineaEntregaService.find(id)
            .subscribe((lineaEntregaResponse: HttpResponse<LineaEntrega>) => {
                this.lineaEntrega = lineaEntregaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLineaEntregas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'lineaEntregaListModification',
            (response) => this.load(this.lineaEntrega.id)
        );
    }
}
