import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Entrega } from './entrega.model';
import { EntregaService } from './entrega.service';

@Injectable()
export class EntregaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private entregaService: EntregaService

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
                this.entregaService.find(id)
                    .subscribe((entregaResponse: HttpResponse<Entrega>) => {
                        const entrega: Entrega = entregaResponse.body;
                        if (entrega.fechaInicio) {
                            entrega.fechaInicio = {
                                year: entrega.fechaInicio.getFullYear(),
                                month: entrega.fechaInicio.getMonth() + 1,
                                day: entrega.fechaInicio.getDate()
                            };
                        }
                        this.ngbModalRef = this.entregaModalRef(component, entrega);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.entregaModalRef(component, new Entrega());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    entregaModalRef(component: Component, entrega: Entrega): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.entrega = entrega;
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
