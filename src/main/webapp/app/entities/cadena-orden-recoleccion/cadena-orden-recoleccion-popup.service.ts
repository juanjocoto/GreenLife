import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CadenaOrdenRecoleccion } from './cadena-orden-recoleccion.model';
import { CadenaOrdenRecoleccionService } from './cadena-orden-recoleccion.service';

@Injectable()
export class CadenaOrdenRecoleccionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cadenaOrdenRecoleccionService: CadenaOrdenRecoleccionService

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
                this.cadenaOrdenRecoleccionService.find(id)
                    .subscribe((cadenaOrdenRecoleccionResponse: HttpResponse<CadenaOrdenRecoleccion>) => {
                        const cadenaOrdenRecoleccion: CadenaOrdenRecoleccion = cadenaOrdenRecoleccionResponse.body;
                        this.ngbModalRef = this.cadenaOrdenRecoleccionModalRef(component, cadenaOrdenRecoleccion);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cadenaOrdenRecoleccionModalRef(component, new CadenaOrdenRecoleccion());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cadenaOrdenRecoleccionModalRef(component: Component, cadenaOrdenRecoleccion: CadenaOrdenRecoleccion): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cadenaOrdenRecoleccion = cadenaOrdenRecoleccion;
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
