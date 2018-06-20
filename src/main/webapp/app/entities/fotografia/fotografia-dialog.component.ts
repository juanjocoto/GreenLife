import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Fotografia } from './fotografia.model';
import { FotografiaPopupService } from './fotografia-popup.service';
import { FotografiaService } from './fotografia.service';
import { CentroAcopio, CentroAcopioService } from '../centro-acopio';
import { Comercio, ComercioService } from '../comercio';
import { Producto, ProductoService } from '../producto';
import { Publicacion, PublicacionService } from '../publicacion';
import { Evento, EventoService } from '../evento';
import { Patrocinador, PatrocinadorService } from '../patrocinador';

@Component({
    selector: 'jhi-fotografia-dialog',
    templateUrl: './fotografia-dialog.component.html'
})
export class FotografiaDialogComponent implements OnInit {

    fotografia: Fotografia;
    isSaving: boolean;

    centroacopios: CentroAcopio[];

    comercios: Comercio[];

    productos: Producto[];

    publicacions: Publicacion[];

    eventos: Evento[];

    patrocinadors: Patrocinador[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private fotografiaService: FotografiaService,
        private centroAcopioService: CentroAcopioService,
        private comercioService: ComercioService,
        private productoService: ProductoService,
        private publicacionService: PublicacionService,
        private eventoService: EventoService,
        private patrocinadorService: PatrocinadorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.centroAcopioService.query()
            .subscribe((res: HttpResponse<CentroAcopio[]>) => { this.centroacopios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.comercioService.query()
            .subscribe((res: HttpResponse<Comercio[]>) => { this.comercios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.productoService.query()
            .subscribe((res: HttpResponse<Producto[]>) => { this.productos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.publicacionService.query()
            .subscribe((res: HttpResponse<Publicacion[]>) => { this.publicacions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.eventoService.query()
            .subscribe((res: HttpResponse<Evento[]>) => { this.eventos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.patrocinadorService.query()
            .subscribe((res: HttpResponse<Patrocinador[]>) => { this.patrocinadors = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.fotografia.id !== undefined) {
            this.subscribeToSaveResponse(
                this.fotografiaService.update(this.fotografia));
        } else {
            this.subscribeToSaveResponse(
                this.fotografiaService.create(this.fotografia));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Fotografia>>) {
        result.subscribe((res: HttpResponse<Fotografia>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Fotografia) {
        this.eventManager.broadcast({ name: 'fotografiaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCentroAcopioById(index: number, item: CentroAcopio) {
        return item.id;
    }

    trackComercioById(index: number, item: Comercio) {
        return item.id;
    }

    trackProductoById(index: number, item: Producto) {
        return item.id;
    }

    trackPublicacionById(index: number, item: Publicacion) {
        return item.id;
    }

    trackEventoById(index: number, item: Evento) {
        return item.id;
    }

    trackPatrocinadorById(index: number, item: Patrocinador) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-fotografia-popup',
    template: ''
})
export class FotografiaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fotografiaPopupService: FotografiaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.fotografiaPopupService
                    .open(FotografiaDialogComponent as Component, params['id']);
            } else {
                this.fotografiaPopupService
                    .open(FotografiaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
