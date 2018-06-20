import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Local } from './local.model';
import { LocalPopupService } from './local-popup.service';
import { LocalService } from './local.service';
import { Fotografia, FotografiaService } from '../fotografia';
import { Comercio, ComercioService } from '../comercio';

@Component({
    selector: 'jhi-local-dialog',
    templateUrl: './local-dialog.component.html'
})
export class LocalDialogComponent implements OnInit {

    local: Local;
    isSaving: boolean;

    fachadas: Fotografia[];

    comercios: Comercio[];
    fechaCreacionDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private localService: LocalService,
        private fotografiaService: FotografiaService,
        private comercioService: ComercioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.fotografiaService
            .query({filter: 'local-is-null'})
            .subscribe((res: HttpResponse<Fotografia[]>) => {
                if (!this.local.fachadaId) {
                    this.fachadas = res.body;
                } else {
                    this.fotografiaService
                        .find(this.local.fachadaId)
                        .subscribe((subRes: HttpResponse<Fotografia>) => {
                            this.fachadas = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.comercioService.query()
            .subscribe((res: HttpResponse<Comercio[]>) => { this.comercios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.local.id !== undefined) {
            this.subscribeToSaveResponse(
                this.localService.update(this.local));
        } else {
            this.subscribeToSaveResponse(
                this.localService.create(this.local));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Local>>) {
        result.subscribe((res: HttpResponse<Local>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Local) {
        this.eventManager.broadcast({ name: 'localListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFotografiaById(index: number, item: Fotografia) {
        return item.id;
    }

    trackComercioById(index: number, item: Comercio) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-local-popup',
    template: ''
})
export class LocalPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private localPopupService: LocalPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.localPopupService
                    .open(LocalDialogComponent as Component, params['id']);
            } else {
                this.localPopupService
                    .open(LocalDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
