import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Etiqueta } from './etiqueta.model';
import { EtiquetaPopupService } from './etiqueta-popup.service';
import { EtiquetaService } from './etiqueta.service';

@Component({
    selector: 'jhi-etiqueta-dialog',
    templateUrl: './etiqueta-dialog.component.html'
})
export class EtiquetaDialogComponent implements OnInit {

    etiqueta: Etiqueta;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private etiquetaService: EtiquetaService,
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
        if (this.etiqueta.id !== undefined) {
            this.subscribeToSaveResponse(
                this.etiquetaService.update(this.etiqueta));
        } else {
            this.subscribeToSaveResponse(
                this.etiquetaService.create(this.etiqueta));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Etiqueta>>) {
        result.subscribe((res: HttpResponse<Etiqueta>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Etiqueta) {
        this.eventManager.broadcast({ name: 'etiquetaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-etiqueta-popup',
    template: ''
})
export class EtiquetaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private etiquetaPopupService: EtiquetaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.etiquetaPopupService
                    .open(EtiquetaDialogComponent as Component, params['id']);
            } else {
                this.etiquetaPopupService
                    .open(EtiquetaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
