import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CadenaEntrega } from './cadena-entrega.model';
import { CadenaEntregaPopupService } from './cadena-entrega-popup.service';
import { CadenaEntregaService } from './cadena-entrega.service';

@Component({
    selector: 'jhi-cadena-entrega-delete-dialog',
    templateUrl: './cadena-entrega-delete-dialog.component.html'
})
export class CadenaEntregaDeleteDialogComponent {

    cadenaEntrega: CadenaEntrega;

    constructor(
        private cadenaEntregaService: CadenaEntregaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cadenaEntregaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cadenaEntregaListModification',
                content: 'Deleted an cadenaEntrega'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cadena-entrega-delete-popup',
    template: ''
})
export class CadenaEntregaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cadenaEntregaPopupService: CadenaEntregaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cadenaEntregaPopupService
                .open(CadenaEntregaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
