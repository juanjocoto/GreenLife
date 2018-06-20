import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Administrador } from './administrador.model';
import { AdministradorPopupService } from './administrador-popup.service';
import { AdministradorService } from './administrador.service';
import { Usuario, UsuarioService } from '../usuario';

@Component({
    selector: 'jhi-administrador-dialog',
    templateUrl: './administrador-dialog.component.html'
})
export class AdministradorDialogComponent implements OnInit {

    administrador: Administrador;
    isSaving: boolean;

    usuarios: Usuario[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private administradorService: AdministradorService,
        private usuarioService: UsuarioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.usuarioService
            .query({filter: 'administrador-is-null'})
            .subscribe((res: HttpResponse<Usuario[]>) => {
                if (!this.administrador.usuarioId) {
                    this.usuarios = res.body;
                } else {
                    this.usuarioService
                        .find(this.administrador.usuarioId)
                        .subscribe((subRes: HttpResponse<Usuario>) => {
                            this.usuarios = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.administrador.id !== undefined) {
            this.subscribeToSaveResponse(
                this.administradorService.update(this.administrador));
        } else {
            this.subscribeToSaveResponse(
                this.administradorService.create(this.administrador));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Administrador>>) {
        result.subscribe((res: HttpResponse<Administrador>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Administrador) {
        this.eventManager.broadcast({ name: 'administradorListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-administrador-popup',
    template: ''
})
export class AdministradorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private administradorPopupService: AdministradorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.administradorPopupService
                    .open(AdministradorDialogComponent as Component, params['id']);
            } else {
                this.administradorPopupService
                    .open(AdministradorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
