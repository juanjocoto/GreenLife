import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ResenaCliente } from './resena-cliente.model';
import { ResenaClienteService } from './resena-cliente.service';

@Injectable()
export class ResenaClientePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private resenaClienteService: ResenaClienteService

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
                this.resenaClienteService.find(id)
                    .subscribe((resenaClienteResponse: HttpResponse<ResenaCliente>) => {
                        const resenaCliente: ResenaCliente = resenaClienteResponse.body;
                        if (resenaCliente.fechaCreacion) {
                            resenaCliente.fechaCreacion = {
                                year: resenaCliente.fechaCreacion.getFullYear(),
                                month: resenaCliente.fechaCreacion.getMonth() + 1,
                                day: resenaCliente.fechaCreacion.getDate()
                            };
                        }
                        this.ngbModalRef = this.resenaClienteModalRef(component, resenaCliente);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.resenaClienteModalRef(component, new ResenaCliente());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    resenaClienteModalRef(component: Component, resenaCliente: ResenaCliente): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.resenaCliente = resenaCliente;
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
