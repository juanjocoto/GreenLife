import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ResenaComercio } from './resena-comercio.model';
import { ResenaComercioService } from './resena-comercio.service';

@Component({
    selector: 'jhi-resena-comercio-detail',
    templateUrl: './resena-comercio-detail.component.html'
})
export class ResenaComercioDetailComponent implements OnInit, OnDestroy {

    resenaComercio: ResenaComercio;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private resenaComercioService: ResenaComercioService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInResenaComercios();
    }

    load(id) {
        this.resenaComercioService.find(id)
            .subscribe((resenaComercioResponse: HttpResponse<ResenaComercio>) => {
                this.resenaComercio = resenaComercioResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInResenaComercios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'resenaComercioListModification',
            (response) => this.load(this.resenaComercio.id)
        );
    }
}
