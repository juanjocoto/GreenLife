import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ResenaCliente } from './resena-cliente.model';
import { ResenaClientePopupService } from './resena-cliente-popup.service';
import { ResenaClienteService } from './resena-cliente.service';
import { Comercio, ComercioService } from '../comercio';
import { Cliente, ClienteService } from '../cliente';

@Component({
    selector: 'jhi-resena-cliente-dialog',
    templateUrl: './resena-cliente-dialog.component.html'
})
export class ResenaClienteDialogComponent implements OnInit {

    resenaCliente: ResenaCliente;
    isSaving: boolean;

    comercios: Comercio[];

    clientes: Cliente[];
    fechaCreacionDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private resenaClienteService: ResenaClienteService,
        private comercioService: ComercioService,
        private clienteService: ClienteService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.comercioService.query()
            .subscribe((res: HttpResponse<Comercio[]>) => { this.comercios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.clienteService.query()
            .subscribe((res: HttpResponse<Cliente[]>) => { this.clientes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.resenaCliente.id !== undefined) {
            this.subscribeToSaveResponse(
                this.resenaClienteService.update(this.resenaCliente));
        } else {
            this.subscribeToSaveResponse(
                this.resenaClienteService.create(this.resenaCliente));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ResenaCliente>>) {
        result.subscribe((res: HttpResponse<ResenaCliente>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ResenaCliente) {
        this.eventManager.broadcast({ name: 'resenaClienteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackComercioById(index: number, item: Comercio) {
        return item.id;
    }

    trackClienteById(index: number, item: Cliente) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-resena-cliente-popup',
    template: ''
})
export class ResenaClientePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resenaClientePopupService: ResenaClientePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.resenaClientePopupService
                    .open(ResenaClienteDialogComponent as Component, params['id']);
            } else {
                this.resenaClientePopupService
                    .open(ResenaClienteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
