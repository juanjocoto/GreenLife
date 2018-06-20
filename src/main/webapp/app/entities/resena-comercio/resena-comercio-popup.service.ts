import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ResenaComercio } from './resena-comercio.model';
import { ResenaComercioService } from './resena-comercio.service';

@Injectable()
export class ResenaComercioPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private resenaComercioService: ResenaComercioService

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
                this.resenaComercioService.find(id)
                    .subscribe((resenaComercioResponse: HttpResponse<ResenaComercio>) => {
                        const resenaComercio: ResenaComercio = resenaComercioResponse.body;
                        if (resenaComercio.fechaCreacion) {
                            resenaComercio.fechaCreacion = {
                                year: resenaComercio.fechaCreacion.getFullYear(),
                                month: resenaComercio.fechaCreacion.getMonth() + 1,
                                day: resenaComercio.fechaCreacion.getDate()
                            };
                        }
                        this.ngbModalRef = this.resenaComercioModalRef(component, resenaComercio);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.resenaComercioModalRef(component, new ResenaComercio());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    resenaComercioModalRef(component: Component, resenaComercio: ResenaComercio): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.resenaComercio = resenaComercio;
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
