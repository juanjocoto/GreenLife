import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Entrega } from './entrega.model';
import { EntregaPopupService } from './entrega-popup.service';
import { EntregaService } from './entrega.service';
import { Suscripcion, SuscripcionService } from '../suscripcion';
import { Pedido, PedidoService } from '../pedido';
import { CadenaEntrega, CadenaEntregaService } from '../cadena-entrega';

@Component({
    selector: 'jhi-entrega-dialog',
    templateUrl: './entrega-dialog.component.html'
})
export class EntregaDialogComponent implements OnInit {

    entrega: Entrega;
    isSaving: boolean;

    suscripcions: Suscripcion[];

    pedidos: Pedido[];

    cadenas: CadenaEntrega[];
    fechaInicioDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private entregaService: EntregaService,
        private suscripcionService: SuscripcionService,
        private pedidoService: PedidoService,
        private cadenaEntregaService: CadenaEntregaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.suscripcionService.query()
            .subscribe((res: HttpResponse<Suscripcion[]>) => { this.suscripcions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.pedidoService.query()
            .subscribe((res: HttpResponse<Pedido[]>) => { this.pedidos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cadenaEntregaService
            .query({filter: 'entrega-is-null'})
            .subscribe((res: HttpResponse<CadenaEntrega[]>) => {
                if (!this.entrega.cadenaId) {
                    this.cadenas = res.body;
                } else {
                    this.cadenaEntregaService
                        .find(this.entrega.cadenaId)
                        .subscribe((subRes: HttpResponse<CadenaEntrega>) => {
                            this.cadenas = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.entrega.id !== undefined) {
            this.subscribeToSaveResponse(
                this.entregaService.update(this.entrega));
        } else {
            this.subscribeToSaveResponse(
                this.entregaService.create(this.entrega));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Entrega>>) {
        result.subscribe((res: HttpResponse<Entrega>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Entrega) {
        this.eventManager.broadcast({ name: 'entregaListModification', content: 'OK'});
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

    trackPedidoById(index: number, item: Pedido) {
        return item.id;
    }

    trackCadenaEntregaById(index: number, item: CadenaEntrega) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-entrega-popup',
    template: ''
})
export class EntregaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private entregaPopupService: EntregaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.entregaPopupService
                    .open(EntregaDialogComponent as Component, params['id']);
            } else {
                this.entregaPopupService
                    .open(EntregaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
