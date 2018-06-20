import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TipoContrato } from './tipo-contrato.model';
import { TipoContratoService } from './tipo-contrato.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-tipo-contrato',
    templateUrl: './tipo-contrato.component.html'
})
export class TipoContratoComponent implements OnInit, OnDestroy {
tipoContratoes: TipoContrato[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private tipoContratoService: TipoContratoService,
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
            this.tipoContratoService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<TipoContrato[]>) => this.tipoContratoes = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.tipoContratoService.query().subscribe(
            (res: HttpResponse<TipoContrato[]>) => {
                this.tipoContratoes = res.body;
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
        this.registerChangeInTipoContratoes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TipoContrato) {
        return item.id;
    }
    registerChangeInTipoContratoes() {
        this.eventSubscriber = this.eventManager.subscribe('tipoContratoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
