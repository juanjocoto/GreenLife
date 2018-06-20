import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SolicitudPatrocinio } from './solicitud-patrocinio.model';
import { SolicitudPatrocinioPopupService } from './solicitud-patrocinio-popup.service';
import { SolicitudPatrocinioService } from './solicitud-patrocinio.service';

@Component({
    selector: 'jhi-solicitud-patrocinio-dialog',
    templateUrl: './solicitud-patrocinio-dialog.component.html'
})
export class SolicitudPatrocinioDialogComponent implements OnInit {

    solicitudPatrocinio: SolicitudPatrocinio;
    isSaving: boolean;
    fechaCreacionDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private solicitudPatrocinioService: SolicitudPatrocinioService,
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
        if (this.solicitudPatrocinio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.solicitudPatrocinioService.update(this.solicitudPatrocinio));
        } else {
            this.subscribeToSaveResponse(
                this.solicitudPatrocinioService.create(this.solicitudPatrocinio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SolicitudPatrocinio>>) {
        result.subscribe((res: HttpResponse<SolicitudPatrocinio>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SolicitudPatrocinio) {
        this.eventManager.broadcast({ name: 'solicitudPatrocinioListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-solicitud-patrocinio-popup',
    template: ''
})
export class SolicitudPatrocinioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private solicitudPatrocinioPopupService: SolicitudPatrocinioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.solicitudPatrocinioPopupService
                    .open(SolicitudPatrocinioDialogComponent as Component, params['id']);
            } else {
                this.solicitudPatrocinioPopupService
                    .open(SolicitudPatrocinioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
