import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LineaProducto } from './linea-producto.model';
import { LineaProductoService } from './linea-producto.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-linea-producto',
    templateUrl: './linea-producto.component.html'
})
export class LineaProductoComponent implements OnInit, OnDestroy {
lineaProductos: LineaProducto[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private lineaProductoService: LineaProductoService,
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
            this.lineaProductoService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<LineaProducto[]>) => this.lineaProductos = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.lineaProductoService.query().subscribe(
            (res: HttpResponse<LineaProducto[]>) => {
                this.lineaProductos = res.body;
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
        this.registerChangeInLineaProductos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: LineaProducto) {
        return item.id;
    }
    registerChangeInLineaProductos() {
        this.eventSubscriber = this.eventManager.subscribe('lineaProductoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
