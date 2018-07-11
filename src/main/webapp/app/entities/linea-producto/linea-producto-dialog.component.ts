import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LineaProducto } from './linea-producto.model';
import { LineaProductoPopupService } from './linea-producto-popup.service';
import { LineaProductoService } from './linea-producto.service';
import { Pedido, PedidoService } from '../pedido';
import { Producto, ProductoService } from '../producto';

@Component({
    selector: 'jhi-linea-producto-dialog',
    templateUrl: './linea-producto-dialog.component.html'
})
export class LineaProductoDialogComponent implements OnInit {

    lineaProducto: LineaProducto;
    isSaving: boolean;

    pedidos: Pedido[];

    productos: Producto[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private lineaProductoService: LineaProductoService,
        private pedidoService: PedidoService,
        private productoService: ProductoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.pedidoService.query()
            .subscribe((res: HttpResponse<Pedido[]>) => { this.pedidos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.productoService.query()
            .subscribe((res: HttpResponse<Producto[]>) => { this.productos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.lineaProducto.id !== undefined) {
            this.subscribeToSaveResponse(
                this.lineaProductoService.update(this.lineaProducto));
        } else {
            this.subscribeToSaveResponse(
                this.lineaProductoService.create(this.lineaProducto));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LineaProducto>>) {
        result.subscribe((res: HttpResponse<LineaProducto>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LineaProducto) {
        this.eventManager.broadcast({ name: 'lineaProductoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPedidoById(index: number, item: Pedido) {
        return item.id;
    }

    trackProductoById(index: number, item: Producto) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-linea-producto-popup',
    template: ''
})
export class LineaProductoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lineaProductoPopupService: LineaProductoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.lineaProductoPopupService
                    .open(LineaProductoDialogComponent as Component, params['id']);
            } else {
                this.lineaProductoPopupService
                    .open(LineaProductoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
