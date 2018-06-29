import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LocalService} from '../../../entities/local';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'jhi-config-comercio-locales',
  templateUrl: './config-comercio-locales.component.html',
  styleUrls: [
      'config-comercio-locales.scss'
  ]
})
export class ConfigComercioLocalesComponent implements OnInit {

    formLocales: FormGroup;

    // Default Latitude and Longitude (San Jose, Costa Rica)
    lat = 9.935354;
    long = -84.082753;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private localService: LocalService
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
  }

  createLocal() {

  }

}
