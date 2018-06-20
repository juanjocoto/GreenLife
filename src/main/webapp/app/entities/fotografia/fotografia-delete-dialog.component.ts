import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Fotografia } from './fotografia.model';
import { FotografiaPopupService } from './fotografia-popup.service';
import { FotografiaService } from './fotografia.service';

@Component({
    selector: 'jhi-fotografia-delete-dialog',
    templateUrl: './fotografia-delete-dialog.component.html'
})
export class FotografiaDeleteDialogComponent {

    fotografia: Fotografia;

    constructor(
        private fotografiaService: FotografiaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fotografiaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'fotografiaListModification',
                content: 'Deleted an fotografia'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fotografia-delete-popup',
    template: ''
})
export class FotografiaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fotografiaPopupService: FotografiaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.fotografiaPopupService
                .open(FotografiaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
