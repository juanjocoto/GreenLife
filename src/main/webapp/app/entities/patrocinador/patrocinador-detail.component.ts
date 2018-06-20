import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Patrocinador } from './patrocinador.model';
import { PatrocinadorService } from './patrocinador.service';

@Component({
    selector: 'jhi-patrocinador-detail',
    templateUrl: './patrocinador-detail.component.html'
})
export class PatrocinadorDetailComponent implements OnInit, OnDestroy {

    patrocinador: Patrocinador;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private patrocinadorService: PatrocinadorService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPatrocinadors();
    }

    load(id) {
        this.patrocinadorService.find(id)
            .subscribe((patrocinadorResponse: HttpResponse<Patrocinador>) => {
                this.patrocinador = patrocinadorResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPatrocinadors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'patrocinadorListModification',
            (response) => this.load(this.patrocinador.id)
        );
    }
}
