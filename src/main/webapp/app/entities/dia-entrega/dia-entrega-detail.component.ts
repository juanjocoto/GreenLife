import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DiaEntrega } from './dia-entrega.model';
import { DiaEntregaService } from './dia-entrega.service';

@Component({
    selector: 'jhi-dia-entrega-detail',
    templateUrl: './dia-entrega-detail.component.html'
})
export class DiaEntregaDetailComponent implements OnInit, OnDestroy {

    diaEntrega: DiaEntrega;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private diaEntregaService: DiaEntregaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDiaEntregas();
    }

    load(id) {
        this.diaEntregaService.find(id)
            .subscribe((diaEntregaResponse: HttpResponse<DiaEntrega>) => {
                this.diaEntrega = diaEntregaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDiaEntregas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'diaEntregaListModification',
            (response) => this.load(this.diaEntrega.id)
        );
    }
}
