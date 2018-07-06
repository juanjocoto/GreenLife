import { Component, OnInit } from '@angular/core';

import { Comercio } from '../../../entities/comercio/comercio.model';
import { ComercioService } from '../../../entities/comercio/comercio.service';
import { MatDialog } from '@angular/material';
import { PedidoCrearDialogComponent } from './../../dialogos/pedido-crear-dialog/pedido-crear-dialog.component';

@Component({
  selector: 'jhi-dummy',
  templateUrl: './dummy.component.html',
  styles: []
})
export class DummyComponent implements OnInit {

  comercio: Comercio;

  constructor(private dialog: MatDialog,
    private comercioService: ComercioService) { }

  ngOnInit() {
    this.comercioService.find(1).subscribe((httpResponse) => {
      this.comercio = httpResponse.body;
    });
  }

  abrirDialog() {

    const dialogRef = this.dialog.open(PedidoCrearDialogComponent);
    dialogRef.componentInstance.comercio = this.comercio;
    dialogRef.afterClosed().subscribe(() => {
      console.log('closed');
    });
  }

}
