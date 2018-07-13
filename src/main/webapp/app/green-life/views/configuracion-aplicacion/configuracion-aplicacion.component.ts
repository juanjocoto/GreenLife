import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfiguracionService, Configuracion } from '../../../entities/configuracion';
import { MatSnackBar } from '../../../../../../../node_modules/@angular/material';

@Component({
  selector: 'jhi-configuracion-aplicacion',
  templateUrl: './configuracion-aplicacion.component.html',
  styleUrls: ['configuracion-aplicacion.component.scss']
})
export class ConfiguracionAplicacionComponent implements OnInit {

  formulario: FormGroup;
  configuracion: Configuracion;

  constructor(private formBuilder: FormBuilder, private configuracionService: ConfiguracionService,
    private snackBar: MatSnackBar) {
    this.formulario = this.formBuilder.group({
      razonSocial: ['', [
        Validators.required
      ]],
      cedJuridica: ['', [
        Validators.required
      ]],
      direccion: ['', [
        Validators.required
      ]],
      telefono: ['', [
        Validators.required
      ]],
      calificacionMin: ['', [
        Validators.required,
      ]],
      calificacionMax: ['', [
        Validators.required
      ]],
      nombre: ['', [
        Validators.required
      ]]
    });
  }

  ngOnInit() {
    this.configuracionService.findAll().subscribe((config) => {
      this.configuracion = config.body[config.body.length - 1] as Configuracion;
      this.formulario.patchValue({
        razonSocial: this.configuracion.razonSocial,
        cedJuridica: this.configuracion.cedJuridica,
        direccion: this.configuracion.direccion,
        telefono: this.configuracion.telefono,
        calificacionMin: this.configuracion.calificacionMinima,
        calificacionMax: this.configuracion.calificacionMaxima,
        nombre: this.configuracion.nombreAplicacion
      });
    });
  }

  actualizar() {
    this.configuracion.razonSocial = this.formulario.controls['razonSocial'].value;
    this.configuracion.cedJuridica = this.formulario.controls['cedJuridica'].value;
    this.configuracion.direccion = this.formulario.controls['direccion'].value;
    this.configuracion.telefono = this.formulario.controls['telefono'].value;
    this.configuracion.calificacionMinima = this.formulario.controls['calificacionMin'].value;
    this.configuracion.calificacionMaxima = this.formulario.controls['calificacionMax'].value;
    this.configuracion.nombreAplicacion = this.formulario.controls['nombre'].value;
    this.configuracion.urlLogo = 'none';
    this.configuracionService.update(this.configuracion).subscribe((resul) => {
      this.snackBar.open('Configuración actualizada', undefined, { duration: 2000 });
    }, () => {
      this.snackBar.open('Se generó un error', undefined, { duration: 2000 });
    });
  }

}
