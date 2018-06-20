import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SolicitudSuscripcion } from './solicitud-suscripcion.model';
import { SolicitudSuscripcionPopupService } from './solicitud-suscripcion-popup.service';
import { SolicitudSuscripcionService } from './solicitud-suscripcion.service';

@Component({
    selector: 'jhi-solicitud-suscripcion-delete-dialog',
    templateUrl: './solicitud-suscripcion-delete-dialog.component.html'
})
export class SolicitudSuscripcionDeleteDialogComponent {

    solicitudSuscripcion: SolicitudSuscripcion;

    constructor(
        private solicitudSuscripcionService: SolicitudSuscripcionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.solicitudSuscripcionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'solicitudSuscripcionListModification',
                content: 'Deleted an solicitudSuscripcion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-solicitud-suscripcion-delete-popup',
    template: ''
})
export class SolicitudSuscripcionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private solicitudSuscripcionPopupService: SolicitudSuscripcionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.solicitudSuscripcionPopupService
                .open(SolicitudSuscripcionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
