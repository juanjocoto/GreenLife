import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CentroAcopio } from './centro-acopio.model';
import { CentroAcopioPopupService } from './centro-acopio-popup.service';
import { CentroAcopioService } from './centro-acopio.service';

@Component({
    selector: 'jhi-centro-acopio-delete-dialog',
    templateUrl: './centro-acopio-delete-dialog.component.html'
})
export class CentroAcopioDeleteDialogComponent {

    centroAcopio: CentroAcopio;

    constructor(
        private centroAcopioService: CentroAcopioService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.centroAcopioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'centroAcopioListModification',
                content: 'Deleted an centroAcopio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-centro-acopio-delete-popup',
    template: ''
})
export class CentroAcopioDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private centroAcopioPopupService: CentroAcopioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.centroAcopioPopupService
                .open(CentroAcopioDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
