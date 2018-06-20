import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CobroMensualidad } from './cobro-mensualidad.model';
import { CobroMensualidadService } from './cobro-mensualidad.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cobro-mensualidad',
    templateUrl: './cobro-mensualidad.component.html'
})
export class CobroMensualidadComponent implements OnInit, OnDestroy {
cobroMensualidads: CobroMensualidad[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private cobroMensualidadService: CobroMensualidadService,
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
            this.cobroMensualidadService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<CobroMensualidad[]>) => this.cobroMensualidads = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.cobroMensualidadService.query().subscribe(
            (res: HttpResponse<CobroMensualidad[]>) => {
                this.cobroMensualidads = res.body;
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
        this.registerChangeInCobroMensualidads();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CobroMensualidad) {
        return item.id;
    }
    registerChangeInCobroMensualidads() {
        this.eventSubscriber = this.eventManager.subscribe('cobroMensualidadListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
