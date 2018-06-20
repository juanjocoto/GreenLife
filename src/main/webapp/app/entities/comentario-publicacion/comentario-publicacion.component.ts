import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ComentarioPublicacion } from './comentario-publicacion.model';
import { ComentarioPublicacionService } from './comentario-publicacion.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-comentario-publicacion',
    templateUrl: './comentario-publicacion.component.html'
})
export class ComentarioPublicacionComponent implements OnInit, OnDestroy {
comentarioPublicacions: ComentarioPublicacion[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private comentarioPublicacionService: ComentarioPublicacionService,
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
            this.comentarioPublicacionService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<ComentarioPublicacion[]>) => this.comentarioPublicacions = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.comentarioPublicacionService.query().subscribe(
            (res: HttpResponse<ComentarioPublicacion[]>) => {
                this.comentarioPublicacions = res.body;
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
        this.registerChangeInComentarioPublicacions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ComentarioPublicacion) {
        return item.id;
    }
    registerChangeInComentarioPublicacions() {
        this.eventSubscriber = this.eventManager.subscribe('comentarioPublicacionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
