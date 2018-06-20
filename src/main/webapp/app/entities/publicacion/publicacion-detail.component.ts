import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Publicacion } from './publicacion.model';
import { PublicacionService } from './publicacion.service';

@Component({
    selector: 'jhi-publicacion-detail',
    templateUrl: './publicacion-detail.component.html'
})
export class PublicacionDetailComponent implements OnInit, OnDestroy {

    publicacion: Publicacion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private publicacionService: PublicacionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPublicacions();
    }

    load(id) {
        this.publicacionService.find(id)
            .subscribe((publicacionResponse: HttpResponse<Publicacion>) => {
                this.publicacion = publicacionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPublicacions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'publicacionListModification',
            (response) => this.load(this.publicacion.id)
        );
    }
}
