import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { SolicitudSuscripcion } from './solicitud-suscripcion.model';
import { SolicitudSuscripcionService } from './solicitud-suscripcion.service';

@Injectable()
export class SolicitudSuscripcionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private solicitudSuscripcionService: SolicitudSuscripcionService

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
                this.solicitudSuscripcionService.find(id)
                    .subscribe((solicitudSuscripcionResponse: HttpResponse<SolicitudSuscripcion>) => {
                        const solicitudSuscripcion: SolicitudSuscripcion = solicitudSuscripcionResponse.body;
                        if (solicitudSuscripcion.fecha) {
                            solicitudSuscripcion.fecha = {
                                year: solicitudSuscripcion.fecha.getFullYear(),
                                month: solicitudSuscripcion.fecha.getMonth() + 1,
                                day: solicitudSuscripcion.fecha.getDate()
                            };
                        }
                        this.ngbModalRef = this.solicitudSuscripcionModalRef(component, solicitudSuscripcion);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.solicitudSuscripcionModalRef(component, new SolicitudSuscripcion());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    solicitudSuscripcionModalRef(component: Component, solicitudSuscripcion: SolicitudSuscripcion): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.solicitudSuscripcion = solicitudSuscripcion;
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
