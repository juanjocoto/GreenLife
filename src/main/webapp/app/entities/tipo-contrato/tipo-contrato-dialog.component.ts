import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoContrato } from './tipo-contrato.model';
import { TipoContratoPopupService } from './tipo-contrato-popup.service';
import { TipoContratoService } from './tipo-contrato.service';

@Component({
    selector: 'jhi-tipo-contrato-dialog',
    templateUrl: './tipo-contrato-dialog.component.html'
})
export class TipoContratoDialogComponent implements OnInit {

    tipoContrato: TipoContrato;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private tipoContratoService: TipoContratoService,
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
        if (this.tipoContrato.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipoContratoService.update(this.tipoContrato));
        } else {
            this.subscribeToSaveResponse(
                this.tipoContratoService.create(this.tipoContrato));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TipoContrato>>) {
        result.subscribe((res: HttpResponse<TipoContrato>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TipoContrato) {
        this.eventManager.broadcast({ name: 'tipoContratoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tipo-contrato-popup',
    template: ''
})
export class TipoContratoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoContratoPopupService: TipoContratoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipoContratoPopupService
                    .open(TipoContratoDialogComponent as Component, params['id']);
            } else {
                this.tipoContratoPopupService
                    .open(TipoContratoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
