import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Usuario } from './usuario.model';
import { UsuarioPopupService } from './usuario-popup.service';
import { UsuarioService } from './usuario.service';
import { Fotografia, FotografiaService } from '../fotografia';
import { User, UserService } from '../../shared';
import { Rol, RolService } from '../rol';

@Component({
    selector: 'jhi-usuario-dialog',
    templateUrl: './usuario-dialog.component.html'
})
export class UsuarioDialogComponent implements OnInit {

    usuario: Usuario;
    isSaving: boolean;

    fotos: Fotografia[];

    users: User[];

    rols: Rol[];
    fechaCreacionDp: any;
    fechaNacimientoDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private usuarioService: UsuarioService,
        private fotografiaService: FotografiaService,
        private userService: UserService,
        private rolService: RolService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.fotografiaService
            .query({filter: 'usuario-is-null'})
            .subscribe((res: HttpResponse<Fotografia[]>) => {
                if (!this.usuario.fotoId) {
                    this.fotos = res.body;
                } else {
                    this.fotografiaService
                        .find(this.usuario.fotoId)
                        .subscribe((subRes: HttpResponse<Fotografia>) => {
                            this.fotos = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.rolService.query()
            .subscribe((res: HttpResponse<Rol[]>) => { this.rols = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.usuario.id !== undefined) {
            this.subscribeToSaveResponse(
                this.usuarioService.update(this.usuario));
        } else {
            this.subscribeToSaveResponse(
                this.usuarioService.create(this.usuario));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Usuario>>) {
        result.subscribe((res: HttpResponse<Usuario>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Usuario) {
        this.eventManager.broadcast({ name: 'usuarioListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFotografiaById(index: number, item: Fotografia) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackRolById(index: number, item: Rol) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-usuario-popup',
    template: ''
})
export class UsuarioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private usuarioPopupService: UsuarioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.usuarioPopupService
                    .open(UsuarioDialogComponent as Component, params['id']);
            } else {
                this.usuarioPopupService
                    .open(UsuarioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
