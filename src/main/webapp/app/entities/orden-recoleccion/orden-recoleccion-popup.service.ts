import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { OrdenRecoleccion } from './orden-recoleccion.model';
import { OrdenRecoleccionService } from './orden-recoleccion.service';

@Injectable()
export class OrdenRecoleccionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private ordenRecoleccionService: OrdenRecoleccionService

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
                this.ordenRecoleccionService.find(id)
                    .subscribe((ordenRecoleccionResponse: HttpResponse<OrdenRecoleccion>) => {
                        const ordenRecoleccion: OrdenRecoleccion = ordenRecoleccionResponse.body;
                        if (ordenRecoleccion.fechaCrecion) {
                            ordenRecoleccion.fechaCrecion = {
                                year: ordenRecoleccion.fechaCrecion.getFullYear(),
                                month: ordenRecoleccion.fechaCrecion.getMonth() + 1,
                                day: ordenRecoleccion.fechaCrecion.getDate()
                            };
                        }
                        if (ordenRecoleccion.fechaSolicitud) {
                            ordenRecoleccion.fechaSolicitud = {
                                year: ordenRecoleccion.fechaSolicitud.getFullYear(),
                                month: ordenRecoleccion.fechaSolicitud.getMonth() + 1,
                                day: ordenRecoleccion.fechaSolicitud.getDate()
                            };
                        }
                        this.ngbModalRef = this.ordenRecoleccionModalRef(component, ordenRecoleccion);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.ordenRecoleccionModalRef(component, new OrdenRecoleccion());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    ordenRecoleccionModalRef(component: Component, ordenRecoleccion: OrdenRecoleccion): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.ordenRecoleccion = ordenRecoleccion;
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
