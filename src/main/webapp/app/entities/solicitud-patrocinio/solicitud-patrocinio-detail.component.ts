import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SolicitudPatrocinio } from './solicitud-patrocinio.model';
import { SolicitudPatrocinioService } from './solicitud-patrocinio.service';

@Component({
    selector: 'jhi-solicitud-patrocinio-detail',
    templateUrl: './solicitud-patrocinio-detail.component.html'
})
export class SolicitudPatrocinioDetailComponent implements OnInit, OnDestroy {

    solicitudPatrocinio: SolicitudPatrocinio;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private solicitudPatrocinioService: SolicitudPatrocinioService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSolicitudPatrocinios();
    }

    load(id) {
        this.solicitudPatrocinioService.find(id)
            .subscribe((solicitudPatrocinioResponse: HttpResponse<SolicitudPatrocinio>) => {
                this.solicitudPatrocinio = solicitudPatrocinioResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSolicitudPatrocinios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'solicitudPatrocinioListModification',
            (response) => this.load(this.solicitudPatrocinio.id)
        );
    }
}
