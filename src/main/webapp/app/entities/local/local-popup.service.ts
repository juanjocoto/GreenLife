import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Local } from './local.model';
import { LocalService } from './local.service';

@Injectable()
export class LocalPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private localService: LocalService

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
                this.localService.find(id)
                    .subscribe((localResponse: HttpResponse<Local>) => {
                        const local: Local = localResponse.body;
                        if (local.fechaCreacion) {
                            local.fechaCreacion = {
                                year: local.fechaCreacion.getFullYear(),
                                month: local.fechaCreacion.getMonth() + 1,
                                day: local.fechaCreacion.getDate()
                            };
                        }
                        this.ngbModalRef = this.localModalRef(component, local);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.localModalRef(component, new Local());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    localModalRef(component: Component, local: Local): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.local = local;
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
