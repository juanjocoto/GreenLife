import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ComentarioPublicacion } from './comentario-publicacion.model';
import { ComentarioPublicacionPopupService } from './comentario-publicacion-popup.service';
import { ComentarioPublicacionService } from './comentario-publicacion.service';

@Component({
    selector: 'jhi-comentario-publicacion-delete-dialog',
    templateUrl: './comentario-publicacion-delete-dialog.component.html'
})
export class ComentarioPublicacionDeleteDialogComponent {

    comentarioPublicacion: ComentarioPublicacion;

    constructor(
        private comentarioPublicacionService: ComentarioPublicacionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.comentarioPublicacionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'comentarioPublicacionListModification',
                content: 'Deleted an comentarioPublicacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-comentario-publicacion-delete-popup',
    template: ''
})
export class ComentarioPublicacionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private comentarioPublicacionPopupService: ComentarioPublicacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.comentarioPublicacionPopupService
                .open(ComentarioPublicacionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
