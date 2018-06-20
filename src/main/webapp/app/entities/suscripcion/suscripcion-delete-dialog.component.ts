import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Suscripcion } from './suscripcion.model';
import { SuscripcionPopupService } from './suscripcion-popup.service';
import { SuscripcionService } from './suscripcion.service';

@Component({
    selector: 'jhi-suscripcion-delete-dialog',
    templateUrl: './suscripcion-delete-dialog.component.html'
})
export class SuscripcionDeleteDialogComponent {

    suscripcion: Suscripcion;

    constructor(
        private suscripcionService: SuscripcionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.suscripcionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'suscripcionListModification',
                content: 'Deleted an suscripcion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-suscripcion-delete-popup',
    template: ''
})
export class SuscripcionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private suscripcionPopupService: SuscripcionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.suscripcionPopupService
                .open(SuscripcionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
