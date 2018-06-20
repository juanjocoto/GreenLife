import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Suscripcion } from './suscripcion.model';
import { SuscripcionService } from './suscripcion.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-suscripcion',
    templateUrl: './suscripcion.component.html'
})
export class SuscripcionComponent implements OnInit, OnDestroy {
suscripcions: Suscripcion[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private suscripcionService: SuscripcionService,
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
            this.suscripcionService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<Suscripcion[]>) => this.suscripcions = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.suscripcionService.query().subscribe(
            (res: HttpResponse<Suscripcion[]>) => {
                this.suscripcions = res.body;
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
        this.registerChangeInSuscripcions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Suscripcion) {
        return item.id;
    }
    registerChangeInSuscripcions() {
        this.eventSubscriber = this.eventManager.subscribe('suscripcionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
