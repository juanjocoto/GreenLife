import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CadenaEntrega } from './cadena-entrega.model';
import { CadenaEntregaPopupService } from './cadena-entrega-popup.service';
import { CadenaEntregaService } from './cadena-entrega.service';
import { Entrega, EntregaService } from '../entrega';

@Component({
    selector: 'jhi-cadena-entrega-dialog',
    templateUrl: './cadena-entrega-dialog.component.html'
})
export class CadenaEntregaDialogComponent implements OnInit {

    cadenaEntrega: CadenaEntrega;
    isSaving: boolean;

    entregas: Entrega[];

    previos: CadenaEntrega[];
    fechaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cadenaEntregaService: CadenaEntregaService,
        private entregaService: EntregaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.entregaService.query()
            .subscribe((res: HttpResponse<Entrega[]>) => { this.entregas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cadenaEntregaService
            .query({filter: 'cadenaentrega-is-null'})
            .subscribe((res: HttpResponse<CadenaEntrega[]>) => {
                if (!this.cadenaEntrega.previoId) {
                    this.previos = res.body;
                } else {
                    this.cadenaEntregaService
                        .find(this.cadenaEntrega.previoId)
                        .subscribe((subRes: HttpResponse<CadenaEntrega>) => {
                            this.previos = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cadenaEntrega.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cadenaEntregaService.update(this.cadenaEntrega));
        } else {
            this.subscribeToSaveResponse(
                this.cadenaEntregaService.create(this.cadenaEntrega));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CadenaEntrega>>) {
        result.subscribe((res: HttpResponse<CadenaEntrega>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CadenaEntrega) {
        this.eventManager.broadcast({ name: 'cadenaEntregaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEntregaById(index: number, item: Entrega) {
        return item.id;
    }

    trackCadenaEntregaById(index: number, item: CadenaEntrega) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cadena-entrega-popup',
    template: ''
})
export class CadenaEntregaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cadenaEntregaPopupService: CadenaEntregaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cadenaEntregaPopupService
                    .open(CadenaEntregaDialogComponent as Component, params['id']);
            } else {
                this.cadenaEntregaPopupService
                    .open(CadenaEntregaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
