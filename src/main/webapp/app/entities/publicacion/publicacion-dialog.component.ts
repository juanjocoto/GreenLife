import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Publicacion } from './publicacion.model';
import { PublicacionPopupService } from './publicacion-popup.service';
import { PublicacionService } from './publicacion.service';
import { Usuario, UsuarioService } from '../usuario';
import { Etiqueta, EtiquetaService } from '../etiqueta';

@Component({
    selector: 'jhi-publicacion-dialog',
    templateUrl: './publicacion-dialog.component.html'
})
export class PublicacionDialogComponent implements OnInit {

    publicacion: Publicacion;
    isSaving: boolean;

    usuarios: Usuario[];

    etiquetas: Etiqueta[];
    fechaCreacionDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private publicacionService: PublicacionService,
        private usuarioService: UsuarioService,
        private etiquetaService: EtiquetaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.usuarioService.query()
            .subscribe((res: HttpResponse<Usuario[]>) => { this.usuarios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.etiquetaService.query()
            .subscribe((res: HttpResponse<Etiqueta[]>) => { this.etiquetas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.publicacion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.publicacionService.update(this.publicacion));
        } else {
            this.subscribeToSaveResponse(
                this.publicacionService.create(this.publicacion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Publicacion>>) {
        result.subscribe((res: HttpResponse<Publicacion>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Publicacion) {
        this.eventManager.broadcast({ name: 'publicacionListModification', content: 'OK'});
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

    trackEtiquetaById(index: number, item: Etiqueta) {
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
    selector: 'jhi-publicacion-popup',
    template: ''
})
export class PublicacionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private publicacionPopupService: PublicacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.publicacionPopupService
                    .open(PublicacionDialogComponent as Component, params['id']);
            } else {
                this.publicacionPopupService
                    .open(PublicacionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
