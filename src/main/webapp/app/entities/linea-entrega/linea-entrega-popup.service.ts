import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { LineaEntrega } from './linea-entrega.model';
import { LineaEntregaService } from './linea-entrega.service';

@Injectable()
export class LineaEntregaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private lineaEntregaService: LineaEntregaService

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
                this.lineaEntregaService.find(id)
                    .subscribe((lineaEntregaResponse: HttpResponse<LineaEntrega>) => {
                        const lineaEntrega: LineaEntrega = lineaEntregaResponse.body;
                        this.ngbModalRef = this.lineaEntregaModalRef(component, lineaEntrega);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.lineaEntregaModalRef(component, new LineaEntrega());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    lineaEntregaModalRef(component: Component, lineaEntrega: LineaEntrega): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.lineaEntrega = lineaEntrega;
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
