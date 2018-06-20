import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CobroMensualidad } from './cobro-mensualidad.model';
import { CobroMensualidadPopupService } from './cobro-mensualidad-popup.service';
import { CobroMensualidadService } from './cobro-mensualidad.service';
import { Pago, PagoService } from '../pago';
import { Contrato, ContratoService } from '../contrato';

@Component({
    selector: 'jhi-cobro-mensualidad-dialog',
    templateUrl: './cobro-mensualidad-dialog.component.html'
})
export class CobroMensualidadDialogComponent implements OnInit {

    cobroMensualidad: CobroMensualidad;
    isSaving: boolean;

    pagos: Pago[];

    contratoes: Contrato[];
    fechaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cobroMensualidadService: CobroMensualidadService,
        private pagoService: PagoService,
        private contratoService: ContratoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.pagoService
            .query({filter: 'cobromensualidad-is-null'})
            .subscribe((res: HttpResponse<Pago[]>) => {
                if (!this.cobroMensualidad.pagoId) {
                    this.pagos = res.body;
                } else {
                    this.pagoService
                        .find(this.cobroMensualidad.pagoId)
                        .subscribe((subRes: HttpResponse<Pago>) => {
                            this.pagos = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.contratoService.query()
            .subscribe((res: HttpResponse<Contrato[]>) => { this.contratoes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cobroMensualidad.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cobroMensualidadService.update(this.cobroMensualidad));
        } else {
            this.subscribeToSaveResponse(
                this.cobroMensualidadService.create(this.cobroMensualidad));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CobroMensualidad>>) {
        result.subscribe((res: HttpResponse<CobroMensualidad>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CobroMensualidad) {
        this.eventManager.broadcast({ name: 'cobroMensualidadListModification', content: 'OK'});
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

    trackContratoById(index: number, item: Contrato) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cobro-mensualidad-popup',
    template: ''
})
export class CobroMensualidadPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cobroMensualidadPopupService: CobroMensualidadPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cobroMensualidadPopupService
                    .open(CobroMensualidadDialogComponent as Component, params['id']);
            } else {
                this.cobroMensualidadPopupService
                    .open(CobroMensualidadDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
