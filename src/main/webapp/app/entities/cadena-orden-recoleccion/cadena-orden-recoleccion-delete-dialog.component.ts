import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CadenaOrdenRecoleccion } from './cadena-orden-recoleccion.model';
import { CadenaOrdenRecoleccionPopupService } from './cadena-orden-recoleccion-popup.service';
import { CadenaOrdenRecoleccionService } from './cadena-orden-recoleccion.service';

@Component({
    selector: 'jhi-cadena-orden-recoleccion-delete-dialog',
    templateUrl: './cadena-orden-recoleccion-delete-dialog.component.html'
})
export class CadenaOrdenRecoleccionDeleteDialogComponent {

    cadenaOrdenRecoleccion: CadenaOrdenRecoleccion;

    constructor(
        private cadenaOrdenRecoleccionService: CadenaOrdenRecoleccionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cadenaOrdenRecoleccionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cadenaOrdenRecoleccionListModification',
                content: 'Deleted an cadenaOrdenRecoleccion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cadena-orden-recoleccion-delete-popup',
    template: ''
})
export class CadenaOrdenRecoleccionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cadenaOrdenRecoleccionPopupService: CadenaOrdenRecoleccionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cadenaOrdenRecoleccionPopupService
                .open(CadenaOrdenRecoleccionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
