import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { LineaProducto } from './linea-producto.model';
import { LineaProductoService } from './linea-producto.service';

@Component({
    selector: 'jhi-linea-producto-detail',
    templateUrl: './linea-producto-detail.component.html'
})
export class LineaProductoDetailComponent implements OnInit, OnDestroy {

    lineaProducto: LineaProducto;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private lineaProductoService: LineaProductoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLineaProductos();
    }

    load(id) {
        this.lineaProductoService.find(id)
            .subscribe((lineaProductoResponse: HttpResponse<LineaProducto>) => {
                this.lineaProducto = lineaProductoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLineaProductos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'lineaProductoListModification',
            (response) => this.load(this.lineaProducto.id)
        );
    }
}
