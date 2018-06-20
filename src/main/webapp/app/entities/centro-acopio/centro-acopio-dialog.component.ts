import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CentroAcopio } from './centro-acopio.model';
import { CentroAcopioPopupService } from './centro-acopio-popup.service';
import { CentroAcopioService } from './centro-acopio.service';

@Component({
    selector: 'jhi-centro-acopio-dialog',
    templateUrl: './centro-acopio-dialog.component.html'
})
export class CentroAcopioDialogComponent implements OnInit {

    centroAcopio: CentroAcopio;
    isSaving: boolean;
    fechaCreacionDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private centroAcopioService: CentroAcopioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.centroAcopio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.centroAcopioService.update(this.centroAcopio));
        } else {
            this.subscribeToSaveResponse(
                this.centroAcopioService.create(this.centroAcopio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CentroAcopio>>) {
        result.subscribe((res: HttpResponse<CentroAcopio>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CentroAcopio) {
        this.eventManager.broadcast({ name: 'centroAcopioListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-centro-acopio-popup',
    template: ''
})
export class CentroAcopioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private centroAcopioPopupService: CentroAcopioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.centroAcopioPopupService
                    .open(CentroAcopioDialogComponent as Component, params['id']);
            } else {
                this.centroAcopioPopupService
                    .open(CentroAcopioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
