import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import { MouseEvent } from '@agm/core';
import { CommonAdapterService } from '../../shared/services/common-adapter.service';
import {Local, LocalService} from '../../../entities/local';
import {Comercio, ComercioService} from '../../../entities/comercio';
import {Fotografia, FotografiaService} from '../../../entities/fotografia';

@Component({
  selector: 'jhi-config-comercio-locales',
  templateUrl: './config-comercio-locales.component.html',
  styleUrls: [
      'config-comercio-locales.scss'
  ]
})
export class ConfigComercioLocalesComponent implements OnInit {

    formLocales: FormGroup;
    comercio: Comercio;

    // Google Maps default configuration
    zoom = 7.5;
    // Default Latitude and Longitude (San Jose, Costa Rica)
    lat = 9.935354;
    long = -84.082753;
    // Local marker
    marker: Marker = {
        lat: this.lat,
        long: this.long
    };

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private commonAdapterService: CommonAdapterService,
      private localService: LocalService,
      private comercioService: ComercioService,
      private fotografiaService: FotografiaService
  ) { }

  ngOnInit() {
      this.formLocales = this.formBuilder.group({
          nombre: ['', [
              Validators.required
          ]],
          telefono: ['', [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(8)
          ]],
          direccion: ['', [
              Validators.required
          ]],
          horaApertura: ['', [
              Validators.required
          ]],
          horaCierre: ['', [
              Validators.required
          ]]
      });

      this.route.params.subscribe((params) => {
          this.loadComercio(params['comercioId']);
      });
  }

  createLocal() {
      const newLocal = new Local();

      newLocal.nombre = this.formLocales.get('nombre').value;
      newLocal.telefono = this.formLocales.get('telefono').value;
      newLocal.direccion = this.formLocales.get('direccion').value;
      newLocal.horario = this.formatHorario(
          this.formLocales.get('horaApertura').value,
          this.formLocales.get('horaCierre').value
      );
      newLocal.latitud = this.marker.lat;
      newLocal.latitude = this.marker.long;
      newLocal.comercioId = this.comercio.id;
      newLocal.comercioRazonSocial = this.comercio.razonSocial;

      if (this.formLocales.valid) {
          newLocal.fechaCreacion = this.commonAdapterService.dateToJHILocalDate(new Date());

          this.localService.create(newLocal).subscribe((result) => {
          });

          this.formLocales.reset();
      }
  }

  private loadComercio(id) {
      this.comercioService.find(id).subscribe((comercioResponse: HttpResponse<Comercio>) => {
          this.comercio = comercioResponse.body;
      });
  }

  private formatHorario(horaApertura: string, horaCierre: string): string {
      return horaApertura + ' a ' + horaCierre;
  }

  // Google Maps methods
  markerDragEnd($event: MouseEvent) {
      this.marker.lat = $event.coords.lat;
      this.marker.long = $event.coords.lng;
  }

}

// Google Maps marker interface
interface Marker {
    lat: number;
    long: number;
}
