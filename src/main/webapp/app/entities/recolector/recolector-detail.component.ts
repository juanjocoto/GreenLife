import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Recolector } from './recolector.model';
import { RecolectorService } from './recolector.service';

@Component({
    selector: 'jhi-recolector-detail',
    templateUrl: './recolector-detail.component.html'
})
export class RecolectorDetailComponent implements OnInit, OnDestroy {

    recolector: Recolector;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private recolectorService: RecolectorService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRecolectors();
    }

    load(id) {
        this.recolectorService.find(id)
            .subscribe((recolectorResponse: HttpResponse<Recolector>) => {
                this.recolector = recolectorResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRecolectors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'recolectorListModification',
            (response) => this.load(this.recolector.id)
        );
    }
}
