import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ResenaComercio } from './resena-comercio.model';
import { ResenaComercioPopupService } from './resena-comercio-popup.service';
import { ResenaComercioService } from './resena-comercio.service';

@Component({
    selector: 'jhi-resena-comercio-delete-dialog',
    templateUrl: './resena-comercio-delete-dialog.component.html'
})
export class ResenaComercioDeleteDialogComponent {

    resenaComercio: ResenaComercio;

    constructor(
        private resenaComercioService: ResenaComercioService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.resenaComercioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'resenaComercioListModification',
                content: 'Deleted an resenaComercio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-resena-comercio-delete-popup',
    template: ''
})
export class ResenaComercioDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resenaComercioPopupService: ResenaComercioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.resenaComercioPopupService
                .open(ResenaComercioDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
