import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Rol } from './rol.model';
import { RolService } from './rol.service';

@Injectable()
export class RolPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private rolService: RolService

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
                this.rolService.find(id)
                    .subscribe((rolResponse: HttpResponse<Rol>) => {
                        const rol: Rol = rolResponse.body;
                        if (rol.fechaCreacion) {
                            rol.fechaCreacion = {
                                year: rol.fechaCreacion.getFullYear(),
                                month: rol.fechaCreacion.getMonth() + 1,
                                day: rol.fechaCreacion.getDate()
                            };
                        }
                        this.ngbModalRef = this.rolModalRef(component, rol);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.rolModalRef(component, new Rol());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    rolModalRef(component: Component, rol: Rol): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.rol = rol;
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
