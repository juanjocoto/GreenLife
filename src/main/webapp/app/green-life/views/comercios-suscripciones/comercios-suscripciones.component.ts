import { Component, OnInit } from '@angular/core';
import { Comercio, ComercioService } from '../../../entities/comercio';
import { ActivatedRoute } from '../../../../../../../node_modules/@angular/router';

@Component({
  selector: 'jhi-comercios-suscripciones',
  templateUrl: './comercios-suscripciones.component.html',
  styleUrls: ['comercios-suscripciones.component.scss']
})

export class ComerciosSuscripcionesComponent implements OnInit {

  comercio: Comercio;

  constructor(private route: ActivatedRoute, private comercioService: ComercioService) { }

  ngOnInit() {
    this.obtenerComercio();
  }

  private obtenerComercio() {
    this.route.params.subscribe((params) => {
      this.comercioService.find(params['comercioId']).subscribe((comercio) => {
        console.log(comercio);
      });
    });
  }

}
