import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Configuracion } from './configuracion.model';
import { ConfiguracionService } from './configuracion.service';

@Component({
    selector: 'jhi-configuracion-detail',
    templateUrl: './configuracion-detail.component.html'
})
export class ConfiguracionDetailComponent implements OnInit, OnDestroy {

    configuracion: Configuracion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private configuracionService: ConfiguracionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInConfiguracions();
    }

    load(id) {
        this.configuracionService.find(id)
            .subscribe((configuracionResponse: HttpResponse<Configuracion>) => {
                this.configuracion = configuracionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInConfiguracions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'configuracionListModification',
            (response) => this.load(this.configuracion.id)
        );
    }
}
