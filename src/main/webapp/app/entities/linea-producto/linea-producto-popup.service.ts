import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { LineaProducto } from './linea-producto.model';
import { LineaProductoService } from './linea-producto.service';

@Injectable()
export class LineaProductoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private lineaProductoService: LineaProductoService

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
                this.lineaProductoService.find(id)
                    .subscribe((lineaProductoResponse: HttpResponse<LineaProducto>) => {
                        const lineaProducto: LineaProducto = lineaProductoResponse.body;
                        this.ngbModalRef = this.lineaProductoModalRef(component, lineaProducto);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.lineaProductoModalRef(component, new LineaProducto());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    lineaProductoModalRef(component: Component, lineaProducto: LineaProducto): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.lineaProducto = lineaProducto;
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
