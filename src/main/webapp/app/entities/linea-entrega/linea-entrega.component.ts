import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LineaEntrega } from './linea-entrega.model';
import { LineaEntregaService } from './linea-entrega.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-linea-entrega',
    templateUrl: './linea-entrega.component.html'
})
export class LineaEntregaComponent implements OnInit, OnDestroy {
lineaEntregas: LineaEntrega[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private lineaEntregaService: LineaEntregaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.lineaEntregaService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<LineaEntrega[]>) => this.lineaEntregas = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.lineaEntregaService.query().subscribe(
            (res: HttpResponse<LineaEntrega[]>) => {
                this.lineaEntregas = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInLineaEntregas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: LineaEntrega) {
        return item.id;
    }
    registerChangeInLineaEntregas() {
        this.eventSubscriber = this.eventManager.subscribe('lineaEntregaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
