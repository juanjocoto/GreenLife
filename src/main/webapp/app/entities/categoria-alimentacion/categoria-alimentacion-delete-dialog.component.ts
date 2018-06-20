import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CategoriaAlimentacion } from './categoria-alimentacion.model';
import { CategoriaAlimentacionPopupService } from './categoria-alimentacion-popup.service';
import { CategoriaAlimentacionService } from './categoria-alimentacion.service';

@Component({
    selector: 'jhi-categoria-alimentacion-delete-dialog',
    templateUrl: './categoria-alimentacion-delete-dialog.component.html'
})
export class CategoriaAlimentacionDeleteDialogComponent {

    categoriaAlimentacion: CategoriaAlimentacion;

    constructor(
        private categoriaAlimentacionService: CategoriaAlimentacionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.categoriaAlimentacionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'categoriaAlimentacionListModification',
                content: 'Deleted an categoriaAlimentacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-categoria-alimentacion-delete-popup',
    template: ''
})
export class CategoriaAlimentacionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private categoriaAlimentacionPopupService: CategoriaAlimentacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.categoriaAlimentacionPopupService
                .open(CategoriaAlimentacionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
