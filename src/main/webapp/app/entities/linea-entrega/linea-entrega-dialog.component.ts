import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LineaEntrega } from './linea-entrega.model';
import { LineaEntregaPopupService } from './linea-entrega-popup.service';
import { LineaEntregaService } from './linea-entrega.service';
import { Producto, ProductoService } from '../producto';
import { Entrega, EntregaService } from '../entrega';

@Component({
    selector: 'jhi-linea-entrega-dialog',
    templateUrl: './linea-entrega-dialog.component.html'
})
export class LineaEntregaDialogComponent implements OnInit {

    lineaEntrega: LineaEntrega;
    isSaving: boolean;

    productos: Producto[];

    entregas: Entrega[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private lineaEntregaService: LineaEntregaService,
        private productoService: ProductoService,
        private entregaService: EntregaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productoService.query()
            .subscribe((res: HttpResponse<Producto[]>) => { this.productos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.entregaService.query()
            .subscribe((res: HttpResponse<Entrega[]>) => { this.entregas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.lineaEntrega.id !== undefined) {
            this.subscribeToSaveResponse(
                this.lineaEntregaService.update(this.lineaEntrega));
        } else {
            this.subscribeToSaveResponse(
                this.lineaEntregaService.create(this.lineaEntrega));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LineaEntrega>>) {
        result.subscribe((res: HttpResponse<LineaEntrega>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LineaEntrega) {
        this.eventManager.broadcast({ name: 'lineaEntregaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProductoById(index: number, item: Producto) {
        return item.id;
    }

    trackEntregaById(index: number, item: Entrega) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-linea-entrega-popup',
    template: ''
})
export class LineaEntregaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lineaEntregaPopupService: LineaEntregaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.lineaEntregaPopupService
                    .open(LineaEntregaDialogComponent as Component, params['id']);
            } else {
                this.lineaEntregaPopupService
                    .open(LineaEntregaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
