import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrdenRecoleccion } from './orden-recoleccion.model';
import { OrdenRecoleccionPopupService } from './orden-recoleccion-popup.service';
import { OrdenRecoleccionService } from './orden-recoleccion.service';

@Component({
    selector: 'jhi-orden-recoleccion-delete-dialog',
    templateUrl: './orden-recoleccion-delete-dialog.component.html'
})
export class OrdenRecoleccionDeleteDialogComponent {

    ordenRecoleccion: OrdenRecoleccion;

    constructor(
        private ordenRecoleccionService: OrdenRecoleccionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ordenRecoleccionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ordenRecoleccionListModification',
                content: 'Deleted an ordenRecoleccion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-orden-recoleccion-delete-popup',
    template: ''
})
export class OrdenRecoleccionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ordenRecoleccionPopupService: OrdenRecoleccionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ordenRecoleccionPopupService
                .open(OrdenRecoleccionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
