import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CadenaOrdenRecoleccion } from './cadena-orden-recoleccion.model';
import { CadenaOrdenRecoleccionPopupService } from './cadena-orden-recoleccion-popup.service';
import { CadenaOrdenRecoleccionService } from './cadena-orden-recoleccion.service';
import { OrdenRecoleccion, OrdenRecoleccionService } from '../orden-recoleccion';

@Component({
    selector: 'jhi-cadena-orden-recoleccion-dialog',
    templateUrl: './cadena-orden-recoleccion-dialog.component.html'
})
export class CadenaOrdenRecoleccionDialogComponent implements OnInit {

    cadenaOrdenRecoleccion: CadenaOrdenRecoleccion;
    isSaving: boolean;

    ordenrecoleccions: OrdenRecoleccion[];

    previos: CadenaOrdenRecoleccion[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cadenaOrdenRecoleccionService: CadenaOrdenRecoleccionService,
        private ordenRecoleccionService: OrdenRecoleccionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ordenRecoleccionService.query()
            .subscribe((res: HttpResponse<OrdenRecoleccion[]>) => { this.ordenrecoleccions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cadenaOrdenRecoleccionService
            .query({filter: 'cadenaordenrecoleccion-is-null'})
            .subscribe((res: HttpResponse<CadenaOrdenRecoleccion[]>) => {
                if (!this.cadenaOrdenRecoleccion.previoId) {
                    this.previos = res.body;
                } else {
                    this.cadenaOrdenRecoleccionService
                        .find(this.cadenaOrdenRecoleccion.previoId)
                        .subscribe((subRes: HttpResponse<CadenaOrdenRecoleccion>) => {
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
        if (this.cadenaOrdenRecoleccion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cadenaOrdenRecoleccionService.update(this.cadenaOrdenRecoleccion));
        } else {
            this.subscribeToSaveResponse(
                this.cadenaOrdenRecoleccionService.create(this.cadenaOrdenRecoleccion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CadenaOrdenRecoleccion>>) {
        result.subscribe((res: HttpResponse<CadenaOrdenRecoleccion>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CadenaOrdenRecoleccion) {
        this.eventManager.broadcast({ name: 'cadenaOrdenRecoleccionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOrdenRecoleccionById(index: number, item: OrdenRecoleccion) {
        return item.id;
    }

    trackCadenaOrdenRecoleccionById(index: number, item: CadenaOrdenRecoleccion) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cadena-orden-recoleccion-popup',
    template: ''
})
export class CadenaOrdenRecoleccionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cadenaOrdenRecoleccionPopupService: CadenaOrdenRecoleccionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cadenaOrdenRecoleccionPopupService
                    .open(CadenaOrdenRecoleccionDialogComponent as Component, params['id']);
            } else {
                this.cadenaOrdenRecoleccionPopupService
                    .open(CadenaOrdenRecoleccionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
