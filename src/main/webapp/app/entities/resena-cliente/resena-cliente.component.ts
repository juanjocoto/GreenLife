import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ResenaCliente } from './resena-cliente.model';
import { ResenaClienteService } from './resena-cliente.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-resena-cliente',
    templateUrl: './resena-cliente.component.html'
})
export class ResenaClienteComponent implements OnInit, OnDestroy {
resenaClientes: ResenaCliente[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private resenaClienteService: ResenaClienteService,
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
            this.resenaClienteService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<ResenaCliente[]>) => this.resenaClientes = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.resenaClienteService.query().subscribe(
            (res: HttpResponse<ResenaCliente[]>) => {
                this.resenaClientes = res.body;
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
        this.registerChangeInResenaClientes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ResenaCliente) {
        return item.id;
    }
    registerChangeInResenaClientes() {
        this.eventSubscriber = this.eventManager.subscribe('resenaClienteListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
