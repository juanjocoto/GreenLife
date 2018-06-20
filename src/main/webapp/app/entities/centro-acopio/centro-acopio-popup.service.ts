import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CentroAcopio } from './centro-acopio.model';
import { CentroAcopioService } from './centro-acopio.service';

@Injectable()
export class CentroAcopioPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private centroAcopioService: CentroAcopioService

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
                this.centroAcopioService.find(id)
                    .subscribe((centroAcopioResponse: HttpResponse<CentroAcopio>) => {
                        const centroAcopio: CentroAcopio = centroAcopioResponse.body;
                        if (centroAcopio.fechaCreacion) {
                            centroAcopio.fechaCreacion = {
                                year: centroAcopio.fechaCreacion.getFullYear(),
                                month: centroAcopio.fechaCreacion.getMonth() + 1,
                                day: centroAcopio.fechaCreacion.getDate()
                            };
                        }
                        this.ngbModalRef = this.centroAcopioModalRef(component, centroAcopio);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.centroAcopioModalRef(component, new CentroAcopio());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    centroAcopioModalRef(component: Component, centroAcopio: CentroAcopio): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.centroAcopio = centroAcopio;
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
