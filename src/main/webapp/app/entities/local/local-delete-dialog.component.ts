import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Local } from './local.model';
import { LocalPopupService } from './local-popup.service';
import { LocalService } from './local.service';

@Component({
    selector: 'jhi-local-delete-dialog',
    templateUrl: './local-delete-dialog.component.html'
})
export class LocalDeleteDialogComponent {

    local: Local;

    constructor(
        private localService: LocalService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.localService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'localListModification',
                content: 'Deleted an local'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-local-delete-popup',
    template: ''
})
export class LocalDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private localPopupService: LocalPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.localPopupService
                .open(LocalDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
