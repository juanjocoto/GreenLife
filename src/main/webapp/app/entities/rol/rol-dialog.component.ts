import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Rol } from './rol.model';
import { RolPopupService } from './rol-popup.service';
import { RolService } from './rol.service';
import { Permiso, PermisoService } from '../permiso';

@Component({
    selector: 'jhi-rol-dialog',
    templateUrl: './rol-dialog.component.html'
})
export class RolDialogComponent implements OnInit {

    rol: Rol;
    isSaving: boolean;

    permisos: Permiso[];
    fechaCreacionDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private rolService: RolService,
        private permisoService: PermisoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.permisoService.query()
            .subscribe((res: HttpResponse<Permiso[]>) => { this.permisos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.rol.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rolService.update(this.rol));
        } else {
            this.subscribeToSaveResponse(
                this.rolService.create(this.rol));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Rol>>) {
        result.subscribe((res: HttpResponse<Rol>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Rol) {
        this.eventManager.broadcast({ name: 'rolListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPermisoById(index: number, item: Permiso) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-rol-popup',
    template: ''
})
export class RolPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rolPopupService: RolPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rolPopupService
                    .open(RolDialogComponent as Component, params['id']);
            } else {
                this.rolPopupService
                    .open(RolDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
