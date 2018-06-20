import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Administrador } from './administrador.model';
import { AdministradorService } from './administrador.service';

@Component({
    selector: 'jhi-administrador-detail',
    templateUrl: './administrador-detail.component.html'
})
export class AdministradorDetailComponent implements OnInit, OnDestroy {

    administrador: Administrador;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private administradorService: AdministradorService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAdministradors();
    }

    load(id) {
        this.administradorService.find(id)
            .subscribe((administradorResponse: HttpResponse<Administrador>) => {
                this.administrador = administradorResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAdministradors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'administradorListModification',
            (response) => this.load(this.administrador.id)
        );
    }
}
