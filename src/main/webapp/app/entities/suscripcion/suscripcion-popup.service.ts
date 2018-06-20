import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Suscripcion } from './suscripcion.model';
import { SuscripcionService } from './suscripcion.service';

@Injectable()
export class SuscripcionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private suscripcionService: SuscripcionService

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
                this.suscripcionService.find(id)
                    .subscribe((suscripcionResponse: HttpResponse<Suscripcion>) => {
                        const suscripcion: Suscripcion = suscripcionResponse.body;
                        if (suscripcion.fechaCreacion) {
                            suscripcion.fechaCreacion = {
                                year: suscripcion.fechaCreacion.getFullYear(),
                                month: suscripcion.fechaCreacion.getMonth() + 1,
                                day: suscripcion.fechaCreacion.getDate()
                            };
                        }
                        if (suscripcion.fechaCancelacion) {
                            suscripcion.fechaCancelacion = {
                                year: suscripcion.fechaCancelacion.getFullYear(),
                                month: suscripcion.fechaCancelacion.getMonth() + 1,
                                day: suscripcion.fechaCancelacion.getDate()
                            };
                        }
                        if (suscripcion.fechaCobro) {
                            suscripcion.fechaCobro = {
                                year: suscripcion.fechaCobro.getFullYear(),
                                month: suscripcion.fechaCobro.getMonth() + 1,
                                day: suscripcion.fechaCobro.getDate()
                            };
                        }
                        this.ngbModalRef = this.suscripcionModalRef(component, suscripcion);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.suscripcionModalRef(component, new Suscripcion());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    suscripcionModalRef(component: Component, suscripcion: Suscripcion): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.suscripcion = suscripcion;
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
