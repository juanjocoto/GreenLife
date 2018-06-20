import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Configuracion } from './configuracion.model';
import { ConfiguracionService } from './configuracion.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-configuracion',
    templateUrl: './configuracion.component.html'
})
export class ConfiguracionComponent implements OnInit, OnDestroy {
configuracions: Configuracion[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private configuracionService: ConfiguracionService,
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
            this.configuracionService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<Configuracion[]>) => this.configuracions = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.configuracionService.query().subscribe(
            (res: HttpResponse<Configuracion[]>) => {
                this.configuracions = res.body;
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
        this.registerChangeInConfiguracions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Configuracion) {
        return item.id;
    }
    registerChangeInConfiguracions() {
        this.eventSubscriber = this.eventManager.subscribe('configuracionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
