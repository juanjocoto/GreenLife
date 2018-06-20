import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LineaEntrega } from './linea-entrega.model';
import { LineaEntregaPopupService } from './linea-entrega-popup.service';
import { LineaEntregaService } from './linea-entrega.service';

@Component({
    selector: 'jhi-linea-entrega-delete-dialog',
    templateUrl: './linea-entrega-delete-dialog.component.html'
})
export class LineaEntregaDeleteDialogComponent {

    lineaEntrega: LineaEntrega;

    constructor(
        private lineaEntregaService: LineaEntregaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.lineaEntregaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'lineaEntregaListModification',
                content: 'Deleted an lineaEntrega'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-linea-entrega-delete-popup',
    template: ''
})
export class LineaEntregaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lineaEntregaPopupService: LineaEntregaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.lineaEntregaPopupService
                .open(LineaEntregaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
