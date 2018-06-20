import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LineaProducto } from './linea-producto.model';
import { LineaProductoPopupService } from './linea-producto-popup.service';
import { LineaProductoService } from './linea-producto.service';

@Component({
    selector: 'jhi-linea-producto-delete-dialog',
    templateUrl: './linea-producto-delete-dialog.component.html'
})
export class LineaProductoDeleteDialogComponent {

    lineaProducto: LineaProducto;

    constructor(
        private lineaProductoService: LineaProductoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.lineaProductoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'lineaProductoListModification',
                content: 'Deleted an lineaProducto'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-linea-producto-delete-popup',
    template: ''
})
export class LineaProductoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lineaProductoPopupService: LineaProductoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.lineaProductoPopupService
                .open(LineaProductoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
