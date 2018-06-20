import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Patrocinador } from './patrocinador.model';
import { PatrocinadorPopupService } from './patrocinador-popup.service';
import { PatrocinadorService } from './patrocinador.service';
import { SolicitudPatrocinio, SolicitudPatrocinioService } from '../solicitud-patrocinio';
import { Evento, EventoService } from '../evento';

@Component({
    selector: 'jhi-patrocinador-dialog',
    templateUrl: './patrocinador-dialog.component.html'
})
export class PatrocinadorDialogComponent implements OnInit {

    patrocinador: Patrocinador;
    isSaving: boolean;

    solicituds: SolicitudPatrocinio[];

    eventos: Evento[];
    fechaCreacionDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private patrocinadorService: PatrocinadorService,
        private solicitudPatrocinioService: SolicitudPatrocinioService,
        private eventoService: EventoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.solicitudPatrocinioService
            .query({filter: 'patrocinador-is-null'})
            .subscribe((res: HttpResponse<SolicitudPatrocinio[]>) => {
                if (!this.patrocinador.solicitudId) {
                    this.solicituds = res.body;
                } else {
                    this.solicitudPatrocinioService
                        .find(this.patrocinador.solicitudId)
                        .subscribe((subRes: HttpResponse<SolicitudPatrocinio>) => {
                            this.solicituds = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.eventoService.query()
            .subscribe((res: HttpResponse<Evento[]>) => { this.eventos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.patrocinador.id !== undefined) {
            this.subscribeToSaveResponse(
                this.patrocinadorService.update(this.patrocinador));
        } else {
            this.subscribeToSaveResponse(
                this.patrocinadorService.create(this.patrocinador));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Patrocinador>>) {
        result.subscribe((res: HttpResponse<Patrocinador>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Patrocinador) {
        this.eventManager.broadcast({ name: 'patrocinadorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSolicitudPatrocinioById(index: number, item: SolicitudPatrocinio) {
        return item.id;
    }

    trackEventoById(index: number, item: Evento) {
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
    selector: 'jhi-patrocinador-popup',
    template: ''
})
export class PatrocinadorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private patrocinadorPopupService: PatrocinadorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.patrocinadorPopupService
                    .open(PatrocinadorDialogComponent as Component, params['id']);
            } else {
                this.patrocinadorPopupService
                    .open(PatrocinadorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
