import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CobroSuscripcion } from './cobro-suscripcion.model';
import { CobroSuscripcionService } from './cobro-suscripcion.service';

@Injectable()
export class CobroSuscripcionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cobroSuscripcionService: CobroSuscripcionService

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
                this.cobroSuscripcionService.find(id)
                    .subscribe((cobroSuscripcionResponse: HttpResponse<CobroSuscripcion>) => {
                        const cobroSuscripcion: CobroSuscripcion = cobroSuscripcionResponse.body;
                        if (cobroSuscripcion.fecha) {
                            cobroSuscripcion.fecha = {
                                year: cobroSuscripcion.fecha.getFullYear(),
                                month: cobroSuscripcion.fecha.getMonth() + 1,
                                day: cobroSuscripcion.fecha.getDate()
                            };
                        }
                        this.ngbModalRef = this.cobroSuscripcionModalRef(component, cobroSuscripcion);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cobroSuscripcionModalRef(component, new CobroSuscripcion());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cobroSuscripcionModalRef(component: Component, cobroSuscripcion: CobroSuscripcion): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cobroSuscripcion = cobroSuscripcion;
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
