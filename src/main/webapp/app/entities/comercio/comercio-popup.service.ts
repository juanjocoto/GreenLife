import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Comercio } from './comercio.model';
import { ComercioService } from './comercio.service';

@Injectable()
export class ComercioPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private comercioService: ComercioService

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
                this.comercioService.find(id)
                    .subscribe((comercioResponse: HttpResponse<Comercio>) => {
                        const comercio: Comercio = comercioResponse.body;
                        if (comercio.fechaCreacion) {
                            comercio.fechaCreacion = {
                                year: comercio.fechaCreacion.getFullYear(),
                                month: comercio.fechaCreacion.getMonth() + 1,
                                day: comercio.fechaCreacion.getDate()
                            };
                        }
                        this.ngbModalRef = this.comercioModalRef(component, comercio);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.comercioModalRef(component, new Comercio());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    comercioModalRef(component: Component, comercio: Comercio): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.comercio = comercio;
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
