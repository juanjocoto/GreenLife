import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Comercio, TipoComercio } from '../../../entities/comercio/comercio.model';
import { Usuario } from '../../../entities/usuario/usuario.model';
import { ComercioService } from '../../../entities/comercio/comercio.service';
import { CommonAdapterService } from '../../shared/services/common-adapter.service';

@Component({
  selector: 'jhi-comercios-registro',
  templateUrl: './comercios-registro.component.html',
  styleUrls: ['comercios-registro.component.scss']
})
export class ComerciosRegistroComponent implements OnInit {

  @Input() dueno: Usuario;

  newComercioForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private comercioService: ComercioService,
    private commonAdapterService: CommonAdapterService) { }

  ngOnInit() {
    this.newComercioForm = this.formBuilder.group({
      razonSocial: ['', [Validators.required]],
      nombreComercial: ['', [Validators.required]],
      cedJuridica: ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10)
      ]],
      tipo: ['', [Validators.required]]
    });
  }

  crearComercio() {
    if (this.newComercioForm.valid) {
      const comercio = new Comercio();
      comercio.tipo = this.newComercioForm.get('tipo').value;
      comercio.razonSocial = this.newComercioForm.get('razonSocial').value;
      comercio.nombreComercial = this.newComercioForm.get('nombreComercial').value;
      comercio.cedJuridica = this.newComercioForm.get('cedJuridica').value;
      comercio.duenoId = this.dueno.id;
      comercio.fechaCreacion = this.commonAdapterService.dateToJHILocalDate(new Date());

      this.comercioService.create(comercio).subscribe((resul) => {
        console.log(resul);
      });
    }
  }

}
