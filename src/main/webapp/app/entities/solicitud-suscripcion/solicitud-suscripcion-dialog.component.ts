import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SolicitudSuscripcion } from './solicitud-suscripcion.model';
import { SolicitudSuscripcionPopupService } from './solicitud-suscripcion-popup.service';
import { SolicitudSuscripcionService } from './solicitud-suscripcion.service';
import { Cliente, ClienteService } from '../cliente';
import { Comercio, ComercioService } from '../comercio';

@Component({
    selector: 'jhi-solicitud-suscripcion-dialog',
    templateUrl: './solicitud-suscripcion-dialog.component.html'
})
export class SolicitudSuscripcionDialogComponent implements OnInit {

    solicitudSuscripcion: SolicitudSuscripcion;
    isSaving: boolean;

    clientes: Cliente[];

    comercios: Comercio[];
    fechaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private solicitudSuscripcionService: SolicitudSuscripcionService,
        private clienteService: ClienteService,
        private comercioService: ComercioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.clienteService.query()
            .subscribe((res: HttpResponse<Cliente[]>) => { this.clientes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.comercioService.query()
            .subscribe((res: HttpResponse<Comercio[]>) => { this.comercios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.solicitudSuscripcion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.solicitudSuscripcionService.update(this.solicitudSuscripcion));
        } else {
            this.subscribeToSaveResponse(
                this.solicitudSuscripcionService.create(this.solicitudSuscripcion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SolicitudSuscripcion>>) {
        result.subscribe((res: HttpResponse<SolicitudSuscripcion>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SolicitudSuscripcion) {
        this.eventManager.broadcast({ name: 'solicitudSuscripcionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackClienteById(index: number, item: Cliente) {
        return item.id;
    }

    trackComercioById(index: number, item: Comercio) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-solicitud-suscripcion-popup',
    template: ''
})
export class SolicitudSuscripcionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private solicitudSuscripcionPopupService: SolicitudSuscripcionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.solicitudSuscripcionPopupService
                    .open(SolicitudSuscripcionDialogComponent as Component, params['id']);
            } else {
                this.solicitudSuscripcionPopupService
                    .open(SolicitudSuscripcionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
