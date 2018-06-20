import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Pedido } from './pedido.model';
import { PedidoPopupService } from './pedido-popup.service';
import { PedidoService } from './pedido.service';
import { Suscripcion, SuscripcionService } from '../suscripcion';
import { LineaProducto, LineaProductoService } from '../linea-producto';
import { DiaEntrega, DiaEntregaService } from '../dia-entrega';
import { Local, LocalService } from '../local';

@Component({
    selector: 'jhi-pedido-dialog',
    templateUrl: './pedido-dialog.component.html'
})
export class PedidoDialogComponent implements OnInit {

    pedido: Pedido;
    isSaving: boolean;

    suscripcions: Suscripcion[];

    lineas: LineaProducto[];

    diaentregas: DiaEntrega[];

    locals: Local[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private pedidoService: PedidoService,
        private suscripcionService: SuscripcionService,
        private lineaProductoService: LineaProductoService,
        private diaEntregaService: DiaEntregaService,
        private localService: LocalService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.suscripcionService.query()
            .subscribe((res: HttpResponse<Suscripcion[]>) => { this.suscripcions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.lineaProductoService
            .query({filter: 'pedido-is-null'})
            .subscribe((res: HttpResponse<LineaProducto[]>) => {
                if (!this.pedido.lineasId) {
                    this.lineas = res.body;
                } else {
                    this.lineaProductoService
                        .find(this.pedido.lineasId)
                        .subscribe((subRes: HttpResponse<LineaProducto>) => {
                            this.lineas = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.diaEntregaService.query()
            .subscribe((res: HttpResponse<DiaEntrega[]>) => { this.diaentregas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.localService.query()
            .subscribe((res: HttpResponse<Local[]>) => { this.locals = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pedido.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pedidoService.update(this.pedido));
        } else {
            this.subscribeToSaveResponse(
                this.pedidoService.create(this.pedido));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Pedido>>) {
        result.subscribe((res: HttpResponse<Pedido>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Pedido) {
        this.eventManager.broadcast({ name: 'pedidoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSuscripcionById(index: number, item: Suscripcion) {
        return item.id;
    }

    trackLineaProductoById(index: number, item: LineaProducto) {
        return item.id;
    }

    trackDiaEntregaById(index: number, item: DiaEntrega) {
        return item.id;
    }

    trackLocalById(index: number, item: Local) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-pedido-popup',
    template: ''
})
export class PedidoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pedidoPopupService: PedidoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pedidoPopupService
                    .open(PedidoDialogComponent as Component, params['id']);
            } else {
                this.pedidoPopupService
                    .open(PedidoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
