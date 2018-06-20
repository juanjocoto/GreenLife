import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DiaEntrega } from './dia-entrega.model';
import { DiaEntregaPopupService } from './dia-entrega-popup.service';
import { DiaEntregaService } from './dia-entrega.service';

@Component({
    selector: 'jhi-dia-entrega-delete-dialog',
    templateUrl: './dia-entrega-delete-dialog.component.html'
})
export class DiaEntregaDeleteDialogComponent {

    diaEntrega: DiaEntrega;

    constructor(
        private diaEntregaService: DiaEntregaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.diaEntregaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'diaEntregaListModification',
                content: 'Deleted an diaEntrega'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dia-entrega-delete-popup',
    template: ''
})
export class DiaEntregaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private diaEntregaPopupService: DiaEntregaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.diaEntregaPopupService
                .open(DiaEntregaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
