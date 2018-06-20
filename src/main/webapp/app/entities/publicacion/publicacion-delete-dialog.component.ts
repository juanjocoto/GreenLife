import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Publicacion } from './publicacion.model';
import { PublicacionPopupService } from './publicacion-popup.service';
import { PublicacionService } from './publicacion.service';

@Component({
    selector: 'jhi-publicacion-delete-dialog',
    templateUrl: './publicacion-delete-dialog.component.html'
})
export class PublicacionDeleteDialogComponent {

    publicacion: Publicacion;

    constructor(
        private publicacionService: PublicacionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.publicacionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'publicacionListModification',
                content: 'Deleted an publicacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-publicacion-delete-popup',
    template: ''
})
export class PublicacionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private publicacionPopupService: PublicacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.publicacionPopupService
                .open(PublicacionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
