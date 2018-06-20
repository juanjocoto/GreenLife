import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Recolector } from './recolector.model';
import { RecolectorPopupService } from './recolector-popup.service';
import { RecolectorService } from './recolector.service';

@Component({
    selector: 'jhi-recolector-delete-dialog',
    templateUrl: './recolector-delete-dialog.component.html'
})
export class RecolectorDeleteDialogComponent {

    recolector: Recolector;

    constructor(
        private recolectorService: RecolectorService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.recolectorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'recolectorListModification',
                content: 'Deleted an recolector'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-recolector-delete-popup',
    template: ''
})
export class RecolectorDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private recolectorPopupService: RecolectorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.recolectorPopupService
                .open(RecolectorDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
