import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CategoriaAlimentacion } from './categoria-alimentacion.model';
import { CategoriaAlimentacionService } from './categoria-alimentacion.service';

@Injectable()
export class CategoriaAlimentacionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private categoriaAlimentacionService: CategoriaAlimentacionService

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
                this.categoriaAlimentacionService.find(id)
                    .subscribe((categoriaAlimentacionResponse: HttpResponse<CategoriaAlimentacion>) => {
                        const categoriaAlimentacion: CategoriaAlimentacion = categoriaAlimentacionResponse.body;
                        this.ngbModalRef = this.categoriaAlimentacionModalRef(component, categoriaAlimentacion);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.categoriaAlimentacionModalRef(component, new CategoriaAlimentacion());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    categoriaAlimentacionModalRef(component: Component, categoriaAlimentacion: CategoriaAlimentacion): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.categoriaAlimentacion = categoriaAlimentacion;
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
