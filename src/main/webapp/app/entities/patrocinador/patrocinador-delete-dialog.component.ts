import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Patrocinador } from './patrocinador.model';
import { PatrocinadorPopupService } from './patrocinador-popup.service';
import { PatrocinadorService } from './patrocinador.service';

@Component({
    selector: 'jhi-patrocinador-delete-dialog',
    templateUrl: './patrocinador-delete-dialog.component.html'
})
export class PatrocinadorDeleteDialogComponent {

    patrocinador: Patrocinador;

    constructor(
        private patrocinadorService: PatrocinadorService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.patrocinadorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'patrocinadorListModification',
                content: 'Deleted an patrocinador'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-patrocinador-delete-popup',
    template: ''
})
export class PatrocinadorDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private patrocinadorPopupService: PatrocinadorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.patrocinadorPopupService
                .open(PatrocinadorDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
