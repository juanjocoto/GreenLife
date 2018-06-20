import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrdenRecoleccion } from './orden-recoleccion.model';
import { OrdenRecoleccionPopupService } from './orden-recoleccion-popup.service';
import { OrdenRecoleccionService } from './orden-recoleccion.service';
import { Cliente, ClienteService } from '../cliente';
import { Recolector, RecolectorService } from '../recolector';

@Component({
    selector: 'jhi-orden-recoleccion-dialog',
    templateUrl: './orden-recoleccion-dialog.component.html'
})
export class OrdenRecoleccionDialogComponent implements OnInit {

    ordenRecoleccion: OrdenRecoleccion;
    isSaving: boolean;

    clientes: Cliente[];

    recolectors: Recolector[];
    fechaCrecionDp: any;
    fechaSolicitudDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ordenRecoleccionService: OrdenRecoleccionService,
        private clienteService: ClienteService,
        private recolectorService: RecolectorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.clienteService.query()
            .subscribe((res: HttpResponse<Cliente[]>) => { this.clientes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.recolectorService.query()
            .subscribe((res: HttpResponse<Recolector[]>) => { this.recolectors = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ordenRecoleccion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ordenRecoleccionService.update(this.ordenRecoleccion));
        } else {
            this.subscribeToSaveResponse(
                this.ordenRecoleccionService.create(this.ordenRecoleccion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OrdenRecoleccion>>) {
        result.subscribe((res: HttpResponse<OrdenRecoleccion>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OrdenRecoleccion) {
        this.eventManager.broadcast({ name: 'ordenRecoleccionListModification', content: 'OK'});
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

    trackRecolectorById(index: number, item: Recolector) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-orden-recoleccion-popup',
    template: ''
})
export class OrdenRecoleccionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ordenRecoleccionPopupService: OrdenRecoleccionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ordenRecoleccionPopupService
                    .open(OrdenRecoleccionDialogComponent as Component, params['id']);
            } else {
                this.ordenRecoleccionPopupService
                    .open(OrdenRecoleccionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
