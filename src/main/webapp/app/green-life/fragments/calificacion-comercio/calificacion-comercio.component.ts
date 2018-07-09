import { Component, OnInit } from '@angular/core';
import {ResenaComercio, ResenaComercioService} from '../../../entities/resena-comercio';
import {CommonAdapterService, JHILocalDate} from '../../shared/services/common-adapter.service';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {Comercio, ComercioService} from '../../../entities/comercio';
import {Usuario, UsuarioService} from '../../../entities/usuario';
import {UserService} from '../../../shared';

@Component({
  selector: 'jhi-calificacion-comercio',
  templateUrl: './calificacion-comercio.component.html',
  styles: []
})
export class CalificacionComercioComponent implements OnInit {

    estrellas: boolean[] = [true, true, true, true, true];
    clasificacion: number;
    usuario: Usuario;
    comercio: Comercio;

    constructor(
        private commonAdapterService: CommonAdapterService,
        private route: ActivatedRoute,
        private comercioService: ComercioService,
        private usuarioService: UsuarioService,
        private userService: UserService,
        private resenaComercioService: ResenaComercioService
    ) { }

  ngOnInit() {
        this.route.params.subscribe((params) => {
            this.loadCliente(params['login']);
            this.loadComercio(params['comercioId']);
        });
  }

    setEstrella(data: any): void {
        this.clasificacion = data + 1;
        for ( let i = 0; i <= 4; i++ ) {
            if ( i <= data ) {
                this.estrellas[i] = false;
            } else {
                this.estrellas[i] = true;
            }
        }
    }

    agregar(): void {
        const resenaComercio = new ResenaComercio();
        resenaComercio.calificacion = this.clasificacion;
        resenaComercio.fechaCreacion = this.commonAdapterService.dateToJHILocalDate(new Date());
        resenaComercio.comentario = '';
        resenaComercio.comercioId = this.comercio.id;
        resenaComercio.usuarioId = this.usuario.id;

        this.resenaComercioService.create(resenaComercio).subscribe((result) => {
            console.log(result);
        });
    }

    private loadCliente(login) {
        this.usuarioService.findByUserLogin(login).subscribe((usuarioResponse: HttpResponse<Usuario>) => {
            this.usuario = usuarioResponse.body;
        });
    }

    private loadComercio(id) {
        this.comercioService.find(id).subscribe((comercioResponse: HttpResponse<Comercio>) => {
            this.comercio = comercioResponse.body;
        });
    }
}
