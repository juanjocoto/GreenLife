import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DiaEntrega } from './dia-entrega.model';
import { DiaEntregaService } from './dia-entrega.service';

@Injectable()
export class DiaEntregaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private diaEntregaService: DiaEntregaService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.diaEntregaService.find(id)
                    .subscribe((diaEntregaResponse: HttpResponse<DiaEntrega>) => {
                        const diaEntrega: DiaEntrega = diaEntregaResponse.body;
                        this.ngbModalRef = this.diaEntregaModalRef(component, diaEntrega);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.diaEntregaModalRef(component, new DiaEntrega());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    diaEntregaModalRef(component: Component, diaEntrega: DiaEntrega): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.diaEntrega = diaEntrega;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
