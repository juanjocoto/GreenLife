import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CentroAcopio } from './centro-acopio.model';
import { CentroAcopioService } from './centro-acopio.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-centro-acopio',
    templateUrl: './centro-acopio.component.html'
})
export class CentroAcopioComponent implements OnInit, OnDestroy {
centroAcopios: CentroAcopio[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private centroAcopioService: CentroAcopioService,
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
            this.centroAcopioService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<CentroAcopio[]>) => this.centroAcopios = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.centroAcopioService.query().subscribe(
            (res: HttpResponse<CentroAcopio[]>) => {
                this.centroAcopios = res.body;
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
        this.registerChangeInCentroAcopios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CentroAcopio) {
        return item.id;
    }
    registerChangeInCentroAcopios() {
        this.eventSubscriber = this.eventManager.subscribe('centroAcopioListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
