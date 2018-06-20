import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CobroSuscripcion } from './cobro-suscripcion.model';
import { CobroSuscripcionService } from './cobro-suscripcion.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cobro-suscripcion',
    templateUrl: './cobro-suscripcion.component.html'
})
export class CobroSuscripcionComponent implements OnInit, OnDestroy {
cobroSuscripcions: CobroSuscripcion[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private cobroSuscripcionService: CobroSuscripcionService,
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
            this.cobroSuscripcionService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<CobroSuscripcion[]>) => this.cobroSuscripcions = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.cobroSuscripcionService.query().subscribe(
            (res: HttpResponse<CobroSuscripcion[]>) => {
                this.cobroSuscripcions = res.body;
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
        this.registerChangeInCobroSuscripcions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CobroSuscripcion) {
        return item.id;
    }
    registerChangeInCobroSuscripcions() {
        this.eventSubscriber = this.eventManager.subscribe('cobroSuscripcionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
