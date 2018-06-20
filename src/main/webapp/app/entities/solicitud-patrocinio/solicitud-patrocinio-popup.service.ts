import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { SolicitudPatrocinio } from './solicitud-patrocinio.model';
import { SolicitudPatrocinioService } from './solicitud-patrocinio.service';

@Injectable()
export class SolicitudPatrocinioPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private solicitudPatrocinioService: SolicitudPatrocinioService

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
                this.solicitudPatrocinioService.find(id)
                    .subscribe((solicitudPatrocinioResponse: HttpResponse<SolicitudPatrocinio>) => {
                        const solicitudPatrocinio: SolicitudPatrocinio = solicitudPatrocinioResponse.body;
                        if (solicitudPatrocinio.fechaCreacion) {
                            solicitudPatrocinio.fechaCreacion = {
                                year: solicitudPatrocinio.fechaCreacion.getFullYear(),
                                month: solicitudPatrocinio.fechaCreacion.getMonth() + 1,
                                day: solicitudPatrocinio.fechaCreacion.getDate()
                            };
                        }
                        this.ngbModalRef = this.solicitudPatrocinioModalRef(component, solicitudPatrocinio);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.solicitudPatrocinioModalRef(component, new SolicitudPatrocinio());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    solicitudPatrocinioModalRef(component: Component, solicitudPatrocinio: SolicitudPatrocinio): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.solicitudPatrocinio = solicitudPatrocinio;
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
