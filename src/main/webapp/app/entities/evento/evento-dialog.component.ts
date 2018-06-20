import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Evento } from './evento.model';
import { EventoPopupService } from './evento-popup.service';
import { EventoService } from './evento.service';
import { Etiqueta, EtiquetaService } from '../etiqueta';

@Component({
    selector: 'jhi-evento-dialog',
    templateUrl: './evento-dialog.component.html'
})
export class EventoDialogComponent implements OnInit {

    evento: Evento;
    isSaving: boolean;

    etiquetas: Etiqueta[];
    fechaCreacionDp: any;
    fechaActividadDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private eventoService: EventoService,
        private etiquetaService: EtiquetaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.etiquetaService.query()
            .subscribe((res: HttpResponse<Etiqueta[]>) => { this.etiquetas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.evento.id !== undefined) {
            this.subscribeToSaveResponse(
                this.eventoService.update(this.evento));
        } else {
            this.subscribeToSaveResponse(
                this.eventoService.create(this.evento));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Evento>>) {
        result.subscribe((res: HttpResponse<Evento>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Evento) {
        this.eventManager.broadcast({ name: 'eventoListModification', content: 'OK'});
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
    selector: 'jhi-evento-popup',
    template: ''
})
export class EventoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eventoPopupService: EventoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.eventoPopupService
                    .open(EventoDialogComponent as Component, params['id']);
            } else {
                this.eventoPopupService
                    .open(EventoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
