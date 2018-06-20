import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DiaEntrega } from './dia-entrega.model';
import { DiaEntregaService } from './dia-entrega.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-dia-entrega',
    templateUrl: './dia-entrega.component.html'
})
export class DiaEntregaComponent implements OnInit, OnDestroy {
diaEntregas: DiaEntrega[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private diaEntregaService: DiaEntregaService,
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
            this.diaEntregaService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<DiaEntrega[]>) => this.diaEntregas = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.diaEntregaService.query().subscribe(
            (res: HttpResponse<DiaEntrega[]>) => {
                this.diaEntregas = res.body;
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
        this.registerChangeInDiaEntregas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DiaEntrega) {
        return item.id;
    }
    registerChangeInDiaEntregas() {
        this.eventSubscriber = this.eventManager.subscribe('diaEntregaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
