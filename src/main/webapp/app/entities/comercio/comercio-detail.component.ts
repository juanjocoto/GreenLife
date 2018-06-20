import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Comercio } from './comercio.model';
import { ComercioService } from './comercio.service';

@Component({
    selector: 'jhi-comercio-detail',
    templateUrl: './comercio-detail.component.html'
})
export class ComercioDetailComponent implements OnInit, OnDestroy {

    comercio: Comercio;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private comercioService: ComercioService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInComercios();
    }

    load(id) {
        this.comercioService.find(id)
            .subscribe((comercioResponse: HttpResponse<Comercio>) => {
                this.comercio = comercioResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInComercios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'comercioListModification',
            (response) => this.load(this.comercio.id)
        );
    }
}
