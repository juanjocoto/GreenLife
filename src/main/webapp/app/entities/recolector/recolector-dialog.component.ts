import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Recolector } from './recolector.model';
import { RecolectorPopupService } from './recolector-popup.service';
import { RecolectorService } from './recolector.service';
import { Usuario, UsuarioService } from '../usuario';

@Component({
    selector: 'jhi-recolector-dialog',
    templateUrl: './recolector-dialog.component.html'
})
export class RecolectorDialogComponent implements OnInit {

    recolector: Recolector;
    isSaving: boolean;

    usuarios: Usuario[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private recolectorService: RecolectorService,
        private usuarioService: UsuarioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.usuarioService
            .query({filter: 'recolector-is-null'})
            .subscribe((res: HttpResponse<Usuario[]>) => {
                if (!this.recolector.usuarioId) {
                    this.usuarios = res.body;
                } else {
                    this.usuarioService
                        .find(this.recolector.usuarioId)
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
        if (this.recolector.id !== undefined) {
            this.subscribeToSaveResponse(
                this.recolectorService.update(this.recolector));
        } else {
            this.subscribeToSaveResponse(
                this.recolectorService.create(this.recolector));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Recolector>>) {
        result.subscribe((res: HttpResponse<Recolector>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Recolector) {
        this.eventManager.broadcast({ name: 'recolectorListModification', content: 'OK'});
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
    selector: 'jhi-recolector-popup',
    template: ''
})
export class RecolectorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private recolectorPopupService: RecolectorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.recolectorPopupService
                    .open(RecolectorDialogComponent as Component, params['id']);
            } else {
                this.recolectorPopupService
                    .open(RecolectorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
