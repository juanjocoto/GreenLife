import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CentroAcopio } from './centro-acopio.model';
import { CentroAcopioService } from './centro-acopio.service';

@Component({
    selector: 'jhi-centro-acopio-detail',
    templateUrl: './centro-acopio-detail.component.html'
})
export class CentroAcopioDetailComponent implements OnInit, OnDestroy {

    centroAcopio: CentroAcopio;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private centroAcopioService: CentroAcopioService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCentroAcopios();
    }

    load(id) {
        this.centroAcopioService.find(id)
            .subscribe((centroAcopioResponse: HttpResponse<CentroAcopio>) => {
                this.centroAcopio = centroAcopioResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCentroAcopios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'centroAcopioListModification',
            (response) => this.load(this.centroAcopio.id)
        );
    }
}
