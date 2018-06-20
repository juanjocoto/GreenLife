import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Fotografia } from './fotografia.model';
import { FotografiaService } from './fotografia.service';

@Component({
    selector: 'jhi-fotografia-detail',
    templateUrl: './fotografia-detail.component.html'
})
export class FotografiaDetailComponent implements OnInit, OnDestroy {

    fotografia: Fotografia;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private fotografiaService: FotografiaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFotografias();
    }

    load(id) {
        this.fotografiaService.find(id)
            .subscribe((fotografiaResponse: HttpResponse<Fotografia>) => {
                this.fotografia = fotografiaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFotografias() {
        this.eventSubscriber = this.eventManager.subscribe(
            'fotografiaListModification',
            (response) => this.load(this.fotografia.id)
        );
    }
}
