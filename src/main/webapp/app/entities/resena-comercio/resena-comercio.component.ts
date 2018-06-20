import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ResenaComercio } from './resena-comercio.model';
import { ResenaComercioService } from './resena-comercio.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-resena-comercio',
    templateUrl: './resena-comercio.component.html'
})
export class ResenaComercioComponent implements OnInit, OnDestroy {
resenaComercios: ResenaComercio[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private resenaComercioService: ResenaComercioService,
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
            this.resenaComercioService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<ResenaComercio[]>) => this.resenaComercios = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.resenaComercioService.query().subscribe(
            (res: HttpResponse<ResenaComercio[]>) => {
                this.resenaComercios = res.body;
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
        this.registerChangeInResenaComercios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ResenaComercio) {
        return item.id;
    }
    registerChangeInResenaComercios() {
        this.eventSubscriber = this.eventManager.subscribe('resenaComercioListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
