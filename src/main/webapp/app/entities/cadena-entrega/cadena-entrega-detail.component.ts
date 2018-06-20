import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CadenaEntrega } from './cadena-entrega.model';
import { CadenaEntregaService } from './cadena-entrega.service';

@Component({
    selector: 'jhi-cadena-entrega-detail',
    templateUrl: './cadena-entrega-detail.component.html'
})
export class CadenaEntregaDetailComponent implements OnInit, OnDestroy {

    cadenaEntrega: CadenaEntrega;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cadenaEntregaService: CadenaEntregaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCadenaEntregas();
    }

    load(id) {
        this.cadenaEntregaService.find(id)
            .subscribe((cadenaEntregaResponse: HttpResponse<CadenaEntrega>) => {
                this.cadenaEntrega = cadenaEntregaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCadenaEntregas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cadenaEntregaListModification',
            (response) => this.load(this.cadenaEntrega.id)
        );
    }
}
