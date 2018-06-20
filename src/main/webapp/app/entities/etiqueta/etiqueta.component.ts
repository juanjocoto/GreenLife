import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Etiqueta } from './etiqueta.model';
import { EtiquetaService } from './etiqueta.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-etiqueta',
    templateUrl: './etiqueta.component.html'
})
export class EtiquetaComponent implements OnInit, OnDestroy {
etiquetas: Etiqueta[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private etiquetaService: EtiquetaService,
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
            this.etiquetaService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<Etiqueta[]>) => this.etiquetas = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.etiquetaService.query().subscribe(
            (res: HttpResponse<Etiqueta[]>) => {
                this.etiquetas = res.body;
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
        this.registerChangeInEtiquetas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Etiqueta) {
        return item.id;
    }
    registerChangeInEtiquetas() {
        this.eventSubscriber = this.eventManager.subscribe('etiquetaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
