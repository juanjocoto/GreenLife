import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Comercio } from './comercio.model';
import { ComercioPopupService } from './comercio-popup.service';
import { ComercioService } from './comercio.service';

@Component({
    selector: 'jhi-comercio-delete-dialog',
    templateUrl: './comercio-delete-dialog.component.html'
})
export class ComercioDeleteDialogComponent {

    comercio: Comercio;

    constructor(
        private comercioService: ComercioService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.comercioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'comercioListModification',
                content: 'Deleted an comercio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-comercio-delete-popup',
    template: ''
})
export class ComercioDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private comercioPopupService: ComercioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.comercioPopupService
                .open(ComercioDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
