import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CadenaEntrega } from './cadena-entrega.model';
import { CadenaEntregaService } from './cadena-entrega.service';

@Injectable()
export class CadenaEntregaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cadenaEntregaService: CadenaEntregaService

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
                this.cadenaEntregaService.find(id)
                    .subscribe((cadenaEntregaResponse: HttpResponse<CadenaEntrega>) => {
                        const cadenaEntrega: CadenaEntrega = cadenaEntregaResponse.body;
                        if (cadenaEntrega.fecha) {
                            cadenaEntrega.fecha = {
                                year: cadenaEntrega.fecha.getFullYear(),
                                month: cadenaEntrega.fecha.getMonth() + 1,
                                day: cadenaEntrega.fecha.getDate()
                            };
                        }
                        this.ngbModalRef = this.cadenaEntregaModalRef(component, cadenaEntrega);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cadenaEntregaModalRef(component, new CadenaEntrega());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cadenaEntregaModalRef(component: Component, cadenaEntrega: CadenaEntrega): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cadenaEntrega = cadenaEntrega;
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
