import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CobroMensualidad } from './cobro-mensualidad.model';
import { CobroMensualidadPopupService } from './cobro-mensualidad-popup.service';
import { CobroMensualidadService } from './cobro-mensualidad.service';

@Component({
    selector: 'jhi-cobro-mensualidad-delete-dialog',
    templateUrl: './cobro-mensualidad-delete-dialog.component.html'
})
export class CobroMensualidadDeleteDialogComponent {

    cobroMensualidad: CobroMensualidad;

    constructor(
        private cobroMensualidadService: CobroMensualidadService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cobroMensualidadService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cobroMensualidadListModification',
                content: 'Deleted an cobroMensualidad'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cobro-mensualidad-delete-popup',
    template: ''
})
export class CobroMensualidadDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cobroMensualidadPopupService: CobroMensualidadPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cobroMensualidadPopupService
                .open(CobroMensualidadDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
