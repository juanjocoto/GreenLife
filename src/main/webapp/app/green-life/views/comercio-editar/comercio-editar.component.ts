import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Comercio } from '../../../entities/comercio';
import { ComercioService } from '../../../entities/comercio/comercio.service';
import { CommonAdapterService } from '../../shared/services/common-adapter.service';

@Component({
  selector: 'jhi-comercio-editar',
  templateUrl: './comercio-editar.component.html',
  styles: [`mat-form-field{with:100%}`]
})
export class ComercioEditarComponent implements OnInit {

  comercio: Comercio;
  comercioForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private comercioService: ComercioService,
    private commonAdapterService: CommonAdapterService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.comercioService.find(params.comercioId).subscribe((httpResponse) => {
        this.comercio = httpResponse.body;

        this.comercioForm.get('razonSocial').setValue(this.comercio.razonSocial);
        this.comercioForm.get('nombreComercial').setValue(this.comercio.nombreComercial);
        this.comercioForm.get('cedJuridica').setValue(this.comercio.cedJuridica);
        this.comercioForm.get('tipo').setValue(this.comercio.tipo);
      });
    });

    this.comercioForm = this.formBuilder.group({
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

  guardar() {
    console.log(this.comercioForm.valid);
    if (this.comercioForm.valid) {

      this.comercio.razonSocial = this.comercioForm.get('razonSocial').value;
      this.comercio.nombreComercial = this.comercioForm.get('nombreComercial').value;
      this.comercio.cedJuridica = this.comercioForm.get('cedJuridica').value;
      this.comercio.tipo = this.comercioForm.get('tipo').value;
      this.comercio.fechaCreacion = this.commonAdapterService.dateToJHILocalDate(this.comercio.fechaCreacion);

      this.comercioService.update(this.comercio).subscribe((httpResponse) => {
        console.log(httpResponse);
      });
    }
  }

}
