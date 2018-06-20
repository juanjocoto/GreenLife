import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DiaEntrega } from './dia-entrega.model';
import { DiaEntregaPopupService } from './dia-entrega-popup.service';
import { DiaEntregaService } from './dia-entrega.service';

@Component({
    selector: 'jhi-dia-entrega-dialog',
    templateUrl: './dia-entrega-dialog.component.html'
})
export class DiaEntregaDialogComponent implements OnInit {

    diaEntrega: DiaEntrega;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private diaEntregaService: DiaEntregaService,
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
        if (this.diaEntrega.id !== undefined) {
            this.subscribeToSaveResponse(
                this.diaEntregaService.update(this.diaEntrega));
        } else {
            this.subscribeToSaveResponse(
                this.diaEntregaService.create(this.diaEntrega));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DiaEntrega>>) {
        result.subscribe((res: HttpResponse<DiaEntrega>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DiaEntrega) {
        this.eventManager.broadcast({ name: 'diaEntregaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-dia-entrega-popup',
    template: ''
})
export class DiaEntregaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private diaEntregaPopupService: DiaEntregaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.diaEntregaPopupService
                    .open(DiaEntregaDialogComponent as Component, params['id']);
            } else {
                this.diaEntregaPopupService
                    .open(DiaEntregaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
