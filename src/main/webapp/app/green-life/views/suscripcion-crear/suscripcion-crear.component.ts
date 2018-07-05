import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {CommonAdapterService} from '../../shared/services/common-adapter.service';
import {Suscripcion, SuscripcionService} from '../../../entities/suscripcion';
import {Comercio, ComercioService} from '../../../entities/comercio';
import {Usuario, UsuarioService} from '../../../entities/usuario';
import {User, UserService} from '../../../shared';

@Component({
    selector: 'jhi-suscripcion-crear',
    templateUrl: './suscripcion-crear.component.html',
    styleUrls: [
        'suscripcion-crear.component.scss'
    ]
})
export class SuscripcionCrearComponent implements OnInit {

    formSuscripcion: FormGroup;
    comercio: Comercio;
    usuario: Usuario;
    user: User;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private commonAdapterService: CommonAdapterService,
        private suscripcionService: SuscripcionService,
        private comercioService: ComercioService,
        private usuarioService: UsuarioService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.validateForm();
    }

    private validateForm() {
        this.formSuscripcion = this.formBuilder.group({
            detalle: ['', [
                Validators.required
            ]]
        });
    }

}
