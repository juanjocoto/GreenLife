import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ComentarioPublicacion } from './comentario-publicacion.model';
import { ComentarioPublicacionPopupService } from './comentario-publicacion-popup.service';
import { ComentarioPublicacionService } from './comentario-publicacion.service';
import { Usuario, UsuarioService } from '../usuario';
import { Publicacion, PublicacionService } from '../publicacion';

@Component({
    selector: 'jhi-comentario-publicacion-dialog',
    templateUrl: './comentario-publicacion-dialog.component.html'
})
export class ComentarioPublicacionDialogComponent implements OnInit {

    comentarioPublicacion: ComentarioPublicacion;
    isSaving: boolean;

    usuarios: Usuario[];

    publicacions: Publicacion[];
    fechaCreacionDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private comentarioPublicacionService: ComentarioPublicacionService,
        private usuarioService: UsuarioService,
        private publicacionService: PublicacionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.usuarioService.query()
            .subscribe((res: HttpResponse<Usuario[]>) => { this.usuarios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.publicacionService.query()
            .subscribe((res: HttpResponse<Publicacion[]>) => { this.publicacions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.comentarioPublicacion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.comentarioPublicacionService.update(this.comentarioPublicacion));
        } else {
            this.subscribeToSaveResponse(
                this.comentarioPublicacionService.create(this.comentarioPublicacion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ComentarioPublicacion>>) {
        result.subscribe((res: HttpResponse<ComentarioPublicacion>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ComentarioPublicacion) {
        this.eventManager.broadcast({ name: 'comentarioPublicacionListModification', content: 'OK'});
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

    trackPublicacionById(index: number, item: Publicacion) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-comentario-publicacion-popup',
    template: ''
})
export class ComentarioPublicacionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private comentarioPublicacionPopupService: ComentarioPublicacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.comentarioPublicacionPopupService
                    .open(ComentarioPublicacionDialogComponent as Component, params['id']);
            } else {
                this.comentarioPublicacionPopupService
                    .open(ComentarioPublicacionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
