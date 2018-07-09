import { Component, OnInit } from '@angular/core';

import { Comercio } from '../../../entities/comercio/comercio.model';
import { MatDialog } from '@angular/material';
import { PedidoCrearDialogComponent } from './../../dialogos/pedido-crear-dialog/pedido-crear-dialog.component';
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

    const dialogRef = this.dialog.open(PedidoCrearDialogComponent);
    dialogRef.componentInstance.suscripcion = this.suscripcion;
    dialogRef.afterClosed().subscribe(() => {
      console.log('closed');
    });
  }

}
