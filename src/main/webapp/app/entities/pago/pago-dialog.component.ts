import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Pago } from './pago.model';
import { PagoPopupService } from './pago-popup.service';
import { PagoService } from './pago.service';

@Component({
    selector: 'jhi-pago-dialog',
    templateUrl: './pago-dialog.component.html'
})
export class PagoDialogComponent implements OnInit {

    pago: Pago;
    isSaving: boolean;
    fechaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private pagoService: PagoService,
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
        if (this.pago.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pagoService.update(this.pago));
        } else {
            this.subscribeToSaveResponse(
                this.pagoService.create(this.pago));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Pago>>) {
        result.subscribe((res: HttpResponse<Pago>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Pago) {
        this.eventManager.broadcast({ name: 'pagoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-pago-popup',
    template: ''
})
export class PagoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pagoPopupService: PagoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pagoPopupService
                    .open(PagoDialogComponent as Component, params['id']);
            } else {
                this.pagoPopupService
                    .open(PagoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
