import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CobroMensualidad } from './cobro-mensualidad.model';
import { CobroMensualidadService } from './cobro-mensualidad.service';

@Injectable()
export class CobroMensualidadPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cobroMensualidadService: CobroMensualidadService

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
                this.cobroMensualidadService.find(id)
                    .subscribe((cobroMensualidadResponse: HttpResponse<CobroMensualidad>) => {
                        const cobroMensualidad: CobroMensualidad = cobroMensualidadResponse.body;
                        if (cobroMensualidad.fecha) {
                            cobroMensualidad.fecha = {
                                year: cobroMensualidad.fecha.getFullYear(),
                                month: cobroMensualidad.fecha.getMonth() + 1,
                                day: cobroMensualidad.fecha.getDate()
                            };
                        }
                        this.ngbModalRef = this.cobroMensualidadModalRef(component, cobroMensualidad);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cobroMensualidadModalRef(component, new CobroMensualidad());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cobroMensualidadModalRef(component: Component, cobroMensualidad: CobroMensualidad): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cobroMensualidad = cobroMensualidad;
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
