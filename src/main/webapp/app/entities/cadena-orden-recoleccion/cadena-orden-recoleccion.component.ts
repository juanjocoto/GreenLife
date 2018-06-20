import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CadenaOrdenRecoleccion } from './cadena-orden-recoleccion.model';
import { CadenaOrdenRecoleccionService } from './cadena-orden-recoleccion.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cadena-orden-recoleccion',
    templateUrl: './cadena-orden-recoleccion.component.html'
})
export class CadenaOrdenRecoleccionComponent implements OnInit, OnDestroy {
cadenaOrdenRecoleccions: CadenaOrdenRecoleccion[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private cadenaOrdenRecoleccionService: CadenaOrdenRecoleccionService,
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
            this.cadenaOrdenRecoleccionService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<CadenaOrdenRecoleccion[]>) => this.cadenaOrdenRecoleccions = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.cadenaOrdenRecoleccionService.query().subscribe(
            (res: HttpResponse<CadenaOrdenRecoleccion[]>) => {
                this.cadenaOrdenRecoleccions = res.body;
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
        this.registerChangeInCadenaOrdenRecoleccions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CadenaOrdenRecoleccion) {
        return item.id;
    }
    registerChangeInCadenaOrdenRecoleccions() {
        this.eventSubscriber = this.eventManager.subscribe('cadenaOrdenRecoleccionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
