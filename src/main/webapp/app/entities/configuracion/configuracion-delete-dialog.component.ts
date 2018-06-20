import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Configuracion } from './configuracion.model';
import { ConfiguracionPopupService } from './configuracion-popup.service';
import { ConfiguracionService } from './configuracion.service';

@Component({
    selector: 'jhi-configuracion-delete-dialog',
    templateUrl: './configuracion-delete-dialog.component.html'
})
export class ConfiguracionDeleteDialogComponent {

    configuracion: Configuracion;

    constructor(
        private configuracionService: ConfiguracionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.configuracionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'configuracionListModification',
                content: 'Deleted an configuracion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-configuracion-delete-popup',
    template: ''
})
export class ConfiguracionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private configuracionPopupService: ConfiguracionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.configuracionPopupService
                .open(ConfiguracionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
