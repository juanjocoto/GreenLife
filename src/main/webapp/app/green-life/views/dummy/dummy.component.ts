import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';
import { Suscripcion } from '../../../entities/suscripcion/suscripcion.model';
import { SuscripcionService } from '../../../entities/suscripcion/suscripcion.service';

@Component({
  selector: 'jhi-dummy',
  templateUrl: './dummy.component.html',
  styles: []
})
export class DummyComponent implements OnInit {

  suscripcion: Suscripcion;

  constructor(private dialog: MatDialog,
    private suscripcionService: SuscripcionService) { }

  ngOnInit() {
    this.suscripcionService.find(1).subscribe((httpResponse) => {
      this.suscripcion = httpResponse.body;
    });
  }

  abrirDialog() {

  }

}
