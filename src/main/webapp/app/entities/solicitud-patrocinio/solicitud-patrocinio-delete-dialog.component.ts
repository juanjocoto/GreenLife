import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SolicitudPatrocinio } from './solicitud-patrocinio.model';
import { SolicitudPatrocinioPopupService } from './solicitud-patrocinio-popup.service';
import { SolicitudPatrocinioService } from './solicitud-patrocinio.service';

@Component({
    selector: 'jhi-solicitud-patrocinio-delete-dialog',
    templateUrl: './solicitud-patrocinio-delete-dialog.component.html'
})
export class SolicitudPatrocinioDeleteDialogComponent {

    solicitudPatrocinio: SolicitudPatrocinio;

    constructor(
        private solicitudPatrocinioService: SolicitudPatrocinioService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.solicitudPatrocinioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'solicitudPatrocinioListModification',
                content: 'Deleted an solicitudPatrocinio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-solicitud-patrocinio-delete-popup',
    template: ''
})
export class SolicitudPatrocinioDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private solicitudPatrocinioPopupService: SolicitudPatrocinioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.solicitudPatrocinioPopupService
                .open(SolicitudPatrocinioDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
