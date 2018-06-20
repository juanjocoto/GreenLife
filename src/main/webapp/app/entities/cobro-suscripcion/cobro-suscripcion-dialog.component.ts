import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CobroSuscripcion } from './cobro-suscripcion.model';
import { CobroSuscripcionPopupService } from './cobro-suscripcion-popup.service';
import { CobroSuscripcionService } from './cobro-suscripcion.service';
import { Pago, PagoService } from '../pago';
import { Cliente, ClienteService } from '../cliente';
import { Comercio, ComercioService } from '../comercio';
import { Suscripcion, SuscripcionService } from '../suscripcion';

@Component({
    selector: 'jhi-cobro-suscripcion-dialog',
    templateUrl: './cobro-suscripcion-dialog.component.html'
})
export class CobroSuscripcionDialogComponent implements OnInit {

    cobroSuscripcion: CobroSuscripcion;
    isSaving: boolean;

    pagos: Pago[];

    clientes: Cliente[];

    comercios: Comercio[];

    suscripcions: Suscripcion[];
    fechaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cobroSuscripcionService: CobroSuscripcionService,
        private pagoService: PagoService,
        private clienteService: ClienteService,
        private comercioService: ComercioService,
        private suscripcionService: SuscripcionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.pagoService
            .query({filter: 'cobrosuscripcion-is-null'})
            .subscribe((res: HttpResponse<Pago[]>) => {
                if (!this.cobroSuscripcion.pagoId) {
                    this.pagos = res.body;
                } else {
                    this.pagoService
                        .find(this.cobroSuscripcion.pagoId)
                        .subscribe((subRes: HttpResponse<Pago>) => {
                            this.pagos = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.clienteService.query()
            .subscribe((res: HttpResponse<Cliente[]>) => { this.clientes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.comercioService.query()
            .subscribe((res: HttpResponse<Comercio[]>) => { this.comercios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.suscripcionService.query()
            .subscribe((res: HttpResponse<Suscripcion[]>) => { this.suscripcions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cobroSuscripcion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cobroSuscripcionService.update(this.cobroSuscripcion));
        } else {
            this.subscribeToSaveResponse(
                this.cobroSuscripcionService.create(this.cobroSuscripcion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CobroSuscripcion>>) {
        result.subscribe((res: HttpResponse<CobroSuscripcion>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CobroSuscripcion) {
        this.eventManager.broadcast({ name: 'cobroSuscripcionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPagoById(index: number, item: Pago) {
        return item.id;
    }

    trackClienteById(index: number, item: Cliente) {
        return item.id;
    }

    trackComercioById(index: number, item: Comercio) {
        return item.id;
    }

    trackSuscripcionById(index: number, item: Suscripcion) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cobro-suscripcion-popup',
    template: ''
})
export class CobroSuscripcionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cobroSuscripcionPopupService: CobroSuscripcionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cobroSuscripcionPopupService
                    .open(CobroSuscripcionDialogComponent as Component, params['id']);
            } else {
                this.cobroSuscripcionPopupService
                    .open(CobroSuscripcionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
