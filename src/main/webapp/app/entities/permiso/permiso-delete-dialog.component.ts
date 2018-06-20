import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Permiso } from './permiso.model';
import { PermisoPopupService } from './permiso-popup.service';
import { PermisoService } from './permiso.service';

@Component({
    selector: 'jhi-permiso-delete-dialog',
    templateUrl: './permiso-delete-dialog.component.html'
})
export class PermisoDeleteDialogComponent {

    permiso: Permiso;

    constructor(
        private permisoService: PermisoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.permisoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'permisoListModification',
                content: 'Deleted an permiso'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-permiso-delete-popup',
    template: ''
})
export class PermisoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private permisoPopupService: PermisoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.permisoPopupService
                .open(PermisoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
