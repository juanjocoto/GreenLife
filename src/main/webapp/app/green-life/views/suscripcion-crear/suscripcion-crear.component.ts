import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {CommonAdapterService, JHILocalDate} from '../../shared/services/common-adapter.service';
import {Suscripcion, EstadoSuscripcion,  SuscripcionService} from '../../../entities/suscripcion';
import {Comercio, ComercioService} from '../../../entities/comercio';
import {Usuario, UsuarioService} from '../../../entities/usuario';
import {User, UserService, AccountService} from '../../../shared';

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
    cliente: Usuario;
    clienteDetail: User;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private commonAdapterService: CommonAdapterService,
        private account: AccountService,
        private suscripcionService: SuscripcionService,
        private comercioService: ComercioService,
        private usuarioService: UsuarioService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.loadComercio(params['comercioId']);
        });

        this.loadCliente();
        this.validateForm();
    }

    createSuscripcion() {
        const newSuscripcion = new Suscripcion();

        newSuscripcion.detalle = this.formSuscripcion.get('detalle').value;
        newSuscripcion.estado = EstadoSuscripcion.PENDIENTE;
        newSuscripcion.fechaCobro = new JHILocalDate(2018, 1, 26);
        newSuscripcion.usuarioId = this.cliente.id;
        newSuscripcion.comercioId = this.comercio.id;
        newSuscripcion.fechaCreacion = this.commonAdapterService.dateToJHILocalDate(new Date());

        this.suscripcionService.create(newSuscripcion).subscribe((result) => {
            this.formSuscripcion.reset();
            this.router.navigate(['app/suscripciones']);
        });
    }

    private loadCliente() {
        this.account.get().subscribe((accountResponse: HttpResponse<Account>) => {
            this.usuarioService.findByUserLogin(accountResponse.body['login']).subscribe((usuarioResponse: HttpResponse<Usuario>) => {
                this.cliente = usuarioResponse.body;
                this.userService.find(accountResponse.body['login']).subscribe((userResponse: HttpResponse<User>) => {
                    this.clienteDetail = userResponse.body;
                });
            });
        });
    }

    private loadComercio(id) {
        this.comercioService.find(id).subscribe((comercioResponse: HttpResponse<Comercio>) => {
            this.comercio = comercioResponse.body;
        });
    }

    private validateForm() {
        this.formSuscripcion = this.formBuilder.group({
            detalle: ['', [
            ]]
        });
    }

}
