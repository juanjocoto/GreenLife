import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Patrocinador } from './patrocinador.model';
import { PatrocinadorService } from './patrocinador.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-patrocinador',
    templateUrl: './patrocinador.component.html'
})
export class PatrocinadorComponent implements OnInit, OnDestroy {
patrocinadors: Patrocinador[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private patrocinadorService: PatrocinadorService,
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
            this.patrocinadorService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<Patrocinador[]>) => this.patrocinadors = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.patrocinadorService.query().subscribe(
            (res: HttpResponse<Patrocinador[]>) => {
                this.patrocinadors = res.body;
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
        this.registerChangeInPatrocinadors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Patrocinador) {
        return item.id;
    }
    registerChangeInPatrocinadors() {
        this.eventSubscriber = this.eventManager.subscribe('patrocinadorListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
