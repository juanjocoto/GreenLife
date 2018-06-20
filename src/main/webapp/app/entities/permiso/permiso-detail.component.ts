import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Permiso } from './permiso.model';
import { PermisoService } from './permiso.service';

@Component({
    selector: 'jhi-permiso-detail',
    templateUrl: './permiso-detail.component.html'
})
export class PermisoDetailComponent implements OnInit, OnDestroy {

    permiso: Permiso;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private permisoService: PermisoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPermisos();
    }

    load(id) {
        this.permisoService.find(id)
            .subscribe((permisoResponse: HttpResponse<Permiso>) => {
                this.permiso = permisoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPermisos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'permisoListModification',
            (response) => this.load(this.permiso.id)
        );
    }
}
