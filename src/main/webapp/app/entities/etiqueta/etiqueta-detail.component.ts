import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Etiqueta } from './etiqueta.model';
import { EtiquetaService } from './etiqueta.service';

@Component({
    selector: 'jhi-etiqueta-detail',
    templateUrl: './etiqueta-detail.component.html'
})
export class EtiquetaDetailComponent implements OnInit, OnDestroy {

    etiqueta: Etiqueta;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private etiquetaService: EtiquetaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEtiquetas();
    }

    load(id) {
        this.etiquetaService.find(id)
            .subscribe((etiquetaResponse: HttpResponse<Etiqueta>) => {
                this.etiqueta = etiquetaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEtiquetas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'etiquetaListModification',
            (response) => this.load(this.etiqueta.id)
        );
    }
}
