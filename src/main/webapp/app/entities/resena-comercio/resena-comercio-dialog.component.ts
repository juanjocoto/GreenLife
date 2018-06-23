import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ResenaComercio } from './resena-comercio.model';
import { ResenaComercioPopupService } from './resena-comercio-popup.service';
import { ResenaComercioService } from './resena-comercio.service';
import { Usuario, UsuarioService } from '../usuario';
import { Comercio, ComercioService } from '../comercio';

@Component({
    selector: 'jhi-resena-comercio-dialog',
    templateUrl: './resena-comercio-dialog.component.html'
})
export class ResenaComercioDialogComponent implements OnInit {

    resenaComercio: ResenaComercio;
    isSaving: boolean;

    usuarios: Usuario[];

    comercios: Comercio[];
    fechaCreacionDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private resenaComercioService: ResenaComercioService,
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
        if (this.resenaComercio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.resenaComercioService.update(this.resenaComercio));
        } else {
            this.subscribeToSaveResponse(
                this.resenaComercioService.create(this.resenaComercio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ResenaComercio>>) {
        result.subscribe((res: HttpResponse<ResenaComercio>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ResenaComercio) {
        this.eventManager.broadcast({ name: 'resenaComercioListModification', content: 'OK'});
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
    selector: 'jhi-resena-comercio-popup',
    template: ''
})
export class ResenaComercioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resenaComercioPopupService: ResenaComercioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.resenaComercioPopupService
                    .open(ResenaComercioDialogComponent as Component, params['id']);
            } else {
                this.resenaComercioPopupService
                    .open(ResenaComercioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
