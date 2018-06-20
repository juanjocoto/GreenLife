import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrdenRecoleccion } from './orden-recoleccion.model';
import { OrdenRecoleccionService } from './orden-recoleccion.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-orden-recoleccion',
    templateUrl: './orden-recoleccion.component.html'
})
export class OrdenRecoleccionComponent implements OnInit, OnDestroy {
ordenRecoleccions: OrdenRecoleccion[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private ordenRecoleccionService: OrdenRecoleccionService,
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
            this.ordenRecoleccionService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<OrdenRecoleccion[]>) => this.ordenRecoleccions = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.ordenRecoleccionService.query().subscribe(
            (res: HttpResponse<OrdenRecoleccion[]>) => {
                this.ordenRecoleccions = res.body;
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
        this.registerChangeInOrdenRecoleccions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: OrdenRecoleccion) {
        return item.id;
    }
    registerChangeInOrdenRecoleccions() {
        this.eventSubscriber = this.eventManager.subscribe('ordenRecoleccionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
