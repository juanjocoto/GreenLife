import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CadenaEntrega } from './cadena-entrega.model';
import { CadenaEntregaService } from './cadena-entrega.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cadena-entrega',
    templateUrl: './cadena-entrega.component.html'
})
export class CadenaEntregaComponent implements OnInit, OnDestroy {
cadenaEntregas: CadenaEntrega[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private cadenaEntregaService: CadenaEntregaService,
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
            this.cadenaEntregaService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<CadenaEntrega[]>) => this.cadenaEntregas = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.cadenaEntregaService.query().subscribe(
            (res: HttpResponse<CadenaEntrega[]>) => {
                this.cadenaEntregas = res.body;
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
        this.registerChangeInCadenaEntregas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CadenaEntrega) {
        return item.id;
    }
    registerChangeInCadenaEntregas() {
        this.eventSubscriber = this.eventManager.subscribe('cadenaEntregaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
