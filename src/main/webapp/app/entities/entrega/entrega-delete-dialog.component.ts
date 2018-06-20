import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Entrega } from './entrega.model';
import { EntregaPopupService } from './entrega-popup.service';
import { EntregaService } from './entrega.service';

@Component({
    selector: 'jhi-entrega-delete-dialog',
    templateUrl: './entrega-delete-dialog.component.html'
})
export class EntregaDeleteDialogComponent {

    entrega: Entrega;

    constructor(
        private entregaService: EntregaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.entregaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'entregaListModification',
                content: 'Deleted an entrega'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-entrega-delete-popup',
    template: ''
})
export class EntregaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private entregaPopupService: EntregaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.entregaPopupService
                .open(EntregaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
