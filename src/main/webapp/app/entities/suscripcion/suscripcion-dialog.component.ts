import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Suscripcion } from './suscripcion.model';
import { SuscripcionPopupService } from './suscripcion-popup.service';
import { SuscripcionService } from './suscripcion.service';
import { Usuario, UsuarioService } from '../usuario';
import { Comercio, ComercioService } from '../comercio';

@Component({
    selector: 'jhi-suscripcion-dialog',
    templateUrl: './suscripcion-dialog.component.html'
})
export class SuscripcionDialogComponent implements OnInit {

    suscripcion: Suscripcion;
    isSaving: boolean;

    usuarios: Usuario[];

    comercios: Comercio[];
    fechaCreacionDp: any;
    fechaCancelacionDp: any;
    fechaCobroDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private suscripcionService: SuscripcionService,
        private usuarioService: UsuarioService,
        private comercioService: ComercioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.usuarioService.query()
            .subscribe((res: HttpResponse<Usuario[]>) => { this.usuarios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.comercioService.query()
            .subscribe((res: HttpResponse<Comercio[]>) => { this.comercios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.suscripcion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.suscripcionService.update(this.suscripcion));
        } else {
            this.subscribeToSaveResponse(
                this.suscripcionService.create(this.suscripcion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Suscripcion>>) {
        result.subscribe((res: HttpResponse<Suscripcion>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Suscripcion) {
        this.eventManager.broadcast({ name: 'suscripcionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUsuarioById(index: number, item: Usuario) {
        return item.id;
    }

    trackComercioById(index: number, item: Comercio) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-suscripcion-popup',
    template: ''
})
export class SuscripcionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private suscripcionPopupService: SuscripcionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.suscripcionPopupService
                    .open(SuscripcionDialogComponent as Component, params['id']);
            } else {
                this.suscripcionPopupService
                    .open(SuscripcionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
