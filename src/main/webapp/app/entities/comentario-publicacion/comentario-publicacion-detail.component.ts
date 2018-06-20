import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ComentarioPublicacion } from './comentario-publicacion.model';
import { ComentarioPublicacionService } from './comentario-publicacion.service';

@Component({
    selector: 'jhi-comentario-publicacion-detail',
    templateUrl: './comentario-publicacion-detail.component.html'
})
export class ComentarioPublicacionDetailComponent implements OnInit, OnDestroy {

    comentarioPublicacion: ComentarioPublicacion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private comentarioPublicacionService: ComentarioPublicacionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInComentarioPublicacions();
    }

    load(id) {
        this.comentarioPublicacionService.find(id)
            .subscribe((comentarioPublicacionResponse: HttpResponse<ComentarioPublicacion>) => {
                this.comentarioPublicacion = comentarioPublicacionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInComentarioPublicacions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'comentarioPublicacionListModification',
            (response) => this.load(this.comentarioPublicacion.id)
        );
    }
}
