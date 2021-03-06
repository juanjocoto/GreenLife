import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Comercio } from './comercio.model';
import { ComercioPopupService } from './comercio-popup.service';
import { ComercioService } from './comercio.service';
import { Etiqueta, EtiquetaService } from '../etiqueta';
import { CategoriaAlimentacion, CategoriaAlimentacionService } from '../categoria-alimentacion';
import { Usuario, UsuarioService } from '../usuario';

@Component({
    selector: 'jhi-comercio-dialog',
    templateUrl: './comercio-dialog.component.html'
})
export class ComercioDialogComponent implements OnInit {

    comercio: Comercio;
    isSaving: boolean;

    etiquetas: Etiqueta[];

    categoriaalimentacions: CategoriaAlimentacion[];

    usuarios: Usuario[];
    fechaCreacionDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private comercioService: ComercioService,
        private etiquetaService: EtiquetaService,
        private categoriaAlimentacionService: CategoriaAlimentacionService,
        private usuarioService: UsuarioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.etiquetaService.query()
            .subscribe((res: HttpResponse<Etiqueta[]>) => { this.etiquetas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.categoriaAlimentacionService.query()
            .subscribe((res: HttpResponse<CategoriaAlimentacion[]>) => { this.categoriaalimentacions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.usuarioService.query()
            .subscribe((res: HttpResponse<Usuario[]>) => { this.usuarios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.comercio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.comercioService.update(this.comercio));
        } else {
            this.subscribeToSaveResponse(
                this.comercioService.create(this.comercio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Comercio>>) {
        result.subscribe((res: HttpResponse<Comercio>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Comercio) {
        this.eventManager.broadcast({ name: 'comercioListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEtiquetaById(index: number, item: Etiqueta) {
        return item.id;
    }

    trackCategoriaAlimentacionById(index: number, item: CategoriaAlimentacion) {
        return item.id;
    }

    trackUsuarioById(index: number, item: Usuario) {
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
    selector: 'jhi-comercio-popup',
    template: ''
})
export class ComercioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private comercioPopupService: ComercioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.comercioPopupService
                    .open(ComercioDialogComponent as Component, params['id']);
            } else {
                this.comercioPopupService
                    .open(ComercioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
