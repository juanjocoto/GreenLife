import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Etiqueta } from './etiqueta.model';
import { EtiquetaPopupService } from './etiqueta-popup.service';
import { EtiquetaService } from './etiqueta.service';

@Component({
    selector: 'jhi-etiqueta-delete-dialog',
    templateUrl: './etiqueta-delete-dialog.component.html'
})
export class EtiquetaDeleteDialogComponent {

    etiqueta: Etiqueta;

    constructor(
        private etiquetaService: EtiquetaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.etiquetaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'etiquetaListModification',
                content: 'Deleted an etiqueta'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-etiqueta-delete-popup',
    template: ''
})
export class EtiquetaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private etiquetaPopupService: EtiquetaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.etiquetaPopupService
                .open(EtiquetaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
