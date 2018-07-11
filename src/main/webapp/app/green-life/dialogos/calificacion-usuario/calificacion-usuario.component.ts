import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../shared/user/user.service';
import {ResenaCliente, ResenaClienteService} from '../../../entities/resena-cliente';
import {Comercio, ComercioService} from '../../../entities/comercio';
import {Usuario, UsuarioService} from '../../../entities/usuario';
import {HttpResponse} from '@angular/common/http';
import {CommonAdapterService, JHILocalDate} from '../../shared/services/common-adapter.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'jhi-calificacion-usuario',
  templateUrl: './calificacion-usuario.component.html',
    styleUrls: ['calificacion-usuario.component.scss']
})
export class CalificacionUsuarioComponent implements OnInit {

    estrellas: boolean[] = [true, true, true, true, true];
    clasificacion: number;
    comercio: Comercio;
    usuario: Usuario;
    calificacionForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private usuarioService: UsuarioService,
        private resenaClienteService: ResenaClienteService,
        private comercioService: ComercioService,
        private commonAdapterService: CommonAdapterService,
        private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
        this.route.params.subscribe((params) => {
            this.loadCliente(params['login']);
            this.loadComercio(params['comercioId']);

            this.calificacionForm = this.formBuilder.group({
                comentario: ['', []]
            });
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
      const resenaCliente = new ResenaCliente();
      resenaCliente.calificacion = this.clasificacion;
      resenaCliente.fechaCreacion = this.commonAdapterService.dateToJHILocalDate(new Date());
      resenaCliente.comentario = this.calificacionForm.get('comentario').value;
      resenaCliente.comercioId = this.comercio.id;
      resenaCliente.clienteId = this.usuario.id;

      this.resenaClienteService.create(resenaCliente).subscribe((result) => {
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
