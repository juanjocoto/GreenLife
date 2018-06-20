import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SolicitudPatrocinio } from './solicitud-patrocinio.model';
import { SolicitudPatrocinioService } from './solicitud-patrocinio.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-solicitud-patrocinio',
    templateUrl: './solicitud-patrocinio.component.html'
})
export class SolicitudPatrocinioComponent implements OnInit, OnDestroy {
solicitudPatrocinios: SolicitudPatrocinio[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private solicitudPatrocinioService: SolicitudPatrocinioService,
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
            this.solicitudPatrocinioService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<SolicitudPatrocinio[]>) => this.solicitudPatrocinios = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.solicitudPatrocinioService.query().subscribe(
            (res: HttpResponse<SolicitudPatrocinio[]>) => {
                this.solicitudPatrocinios = res.body;
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
        this.registerChangeInSolicitudPatrocinios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SolicitudPatrocinio) {
        return item.id;
    }
    registerChangeInSolicitudPatrocinios() {
        this.eventSubscriber = this.eventManager.subscribe('solicitudPatrocinioListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
