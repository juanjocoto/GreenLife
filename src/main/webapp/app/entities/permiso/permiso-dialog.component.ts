import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Permiso } from './permiso.model';
import { PermisoPopupService } from './permiso-popup.service';
import { PermisoService } from './permiso.service';

@Component({
    selector: 'jhi-permiso-dialog',
    templateUrl: './permiso-dialog.component.html'
})
export class PermisoDialogComponent implements OnInit {

    permiso: Permiso;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private permisoService: PermisoService,
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
        if (this.permiso.id !== undefined) {
            this.subscribeToSaveResponse(
                this.permisoService.update(this.permiso));
        } else {
            this.subscribeToSaveResponse(
                this.permisoService.create(this.permiso));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Permiso>>) {
        result.subscribe((res: HttpResponse<Permiso>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Permiso) {
        this.eventManager.broadcast({ name: 'permisoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-permiso-popup',
    template: ''
})
export class PermisoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private permisoPopupService: PermisoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.permisoPopupService
                    .open(PermisoDialogComponent as Component, params['id']);
            } else {
                this.permisoPopupService
                    .open(PermisoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
