import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ResenaCliente } from './resena-cliente.model';
import { ResenaClientePopupService } from './resena-cliente-popup.service';
import { ResenaClienteService } from './resena-cliente.service';

@Component({
    selector: 'jhi-resena-cliente-delete-dialog',
    templateUrl: './resena-cliente-delete-dialog.component.html'
})
export class ResenaClienteDeleteDialogComponent {

    resenaCliente: ResenaCliente;

    constructor(
        private resenaClienteService: ResenaClienteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.resenaClienteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'resenaClienteListModification',
                content: 'Deleted an resenaCliente'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-resena-cliente-delete-popup',
    template: ''
})
export class ResenaClienteDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resenaClientePopupService: ResenaClientePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.resenaClientePopupService
                .open(ResenaClienteDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
