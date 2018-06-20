import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CategoriaAlimentacion } from './categoria-alimentacion.model';
import { CategoriaAlimentacionPopupService } from './categoria-alimentacion-popup.service';
import { CategoriaAlimentacionService } from './categoria-alimentacion.service';

@Component({
    selector: 'jhi-categoria-alimentacion-dialog',
    templateUrl: './categoria-alimentacion-dialog.component.html'
})
export class CategoriaAlimentacionDialogComponent implements OnInit {

    categoriaAlimentacion: CategoriaAlimentacion;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private categoriaAlimentacionService: CategoriaAlimentacionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.categoriaAlimentacion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.categoriaAlimentacionService.update(this.categoriaAlimentacion));
        } else {
            this.subscribeToSaveResponse(
                this.categoriaAlimentacionService.create(this.categoriaAlimentacion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CategoriaAlimentacion>>) {
        result.subscribe((res: HttpResponse<CategoriaAlimentacion>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CategoriaAlimentacion) {
        this.eventManager.broadcast({ name: 'categoriaAlimentacionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-categoria-alimentacion-popup',
    template: ''
})
export class CategoriaAlimentacionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private categoriaAlimentacionPopupService: CategoriaAlimentacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.categoriaAlimentacionPopupService
                    .open(CategoriaAlimentacionDialogComponent as Component, params['id']);
            } else {
                this.categoriaAlimentacionPopupService
                    .open(CategoriaAlimentacionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
