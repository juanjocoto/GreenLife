import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Configuracion } from './configuracion.model';
import { ConfiguracionPopupService } from './configuracion-popup.service';
import { ConfiguracionService } from './configuracion.service';

@Component({
    selector: 'jhi-configuracion-dialog',
    templateUrl: './configuracion-dialog.component.html'
})
export class ConfiguracionDialogComponent implements OnInit {

    configuracion: Configuracion;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private configuracionService: ConfiguracionService,
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
        if (this.configuracion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.configuracionService.update(this.configuracion));
        } else {
            this.subscribeToSaveResponse(
                this.configuracionService.create(this.configuracion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Configuracion>>) {
        result.subscribe((res: HttpResponse<Configuracion>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Configuracion) {
        this.eventManager.broadcast({ name: 'configuracionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-configuracion-popup',
    template: ''
})
export class ConfiguracionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private configuracionPopupService: ConfiguracionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.configuracionPopupService
                    .open(ConfiguracionDialogComponent as Component, params['id']);
            } else {
                this.configuracionPopupService
                    .open(ConfiguracionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
