import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CobroSuscripcion } from './cobro-suscripcion.model';
import { CobroSuscripcionPopupService } from './cobro-suscripcion-popup.service';
import { CobroSuscripcionService } from './cobro-suscripcion.service';

@Component({
    selector: 'jhi-cobro-suscripcion-delete-dialog',
    templateUrl: './cobro-suscripcion-delete-dialog.component.html'
})
export class CobroSuscripcionDeleteDialogComponent {

    cobroSuscripcion: CobroSuscripcion;

    constructor(
        private cobroSuscripcionService: CobroSuscripcionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cobroSuscripcionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cobroSuscripcionListModification',
                content: 'Deleted an cobroSuscripcion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cobro-suscripcion-delete-popup',
    template: ''
})
export class CobroSuscripcionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cobroSuscripcionPopupService: CobroSuscripcionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cobroSuscripcionPopupService
                .open(CobroSuscripcionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
