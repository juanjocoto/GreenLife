import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Patrocinador } from './patrocinador.model';
import { PatrocinadorService } from './patrocinador.service';

@Injectable()
export class PatrocinadorPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private patrocinadorService: PatrocinadorService

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
                this.patrocinadorService.find(id)
                    .subscribe((patrocinadorResponse: HttpResponse<Patrocinador>) => {
                        const patrocinador: Patrocinador = patrocinadorResponse.body;
                        if (patrocinador.fechaCreacion) {
                            patrocinador.fechaCreacion = {
                                year: patrocinador.fechaCreacion.getFullYear(),
                                month: patrocinador.fechaCreacion.getMonth() + 1,
                                day: patrocinador.fechaCreacion.getDate()
                            };
                        }
                        this.ngbModalRef = this.patrocinadorModalRef(component, patrocinador);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.patrocinadorModalRef(component, new Patrocinador());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    patrocinadorModalRef(component: Component, patrocinador: Patrocinador): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.patrocinador = patrocinador;
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
