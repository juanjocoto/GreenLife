import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Publicacion } from './publicacion.model';
import { PublicacionService } from './publicacion.service';

@Injectable()
export class PublicacionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private publicacionService: PublicacionService

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
                this.publicacionService.find(id)
                    .subscribe((publicacionResponse: HttpResponse<Publicacion>) => {
                        const publicacion: Publicacion = publicacionResponse.body;
                        if (publicacion.fechaCreacion) {
                            publicacion.fechaCreacion = {
                                year: publicacion.fechaCreacion.getFullYear(),
                                month: publicacion.fechaCreacion.getMonth() + 1,
                                day: publicacion.fechaCreacion.getDate()
                            };
                        }
                        this.ngbModalRef = this.publicacionModalRef(component, publicacion);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.publicacionModalRef(component, new Publicacion());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    publicacionModalRef(component: Component, publicacion: Publicacion): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.publicacion = publicacion;
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
