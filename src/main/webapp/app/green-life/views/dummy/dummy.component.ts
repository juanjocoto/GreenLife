import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';
import { PedidoCrearDialogComponent } from './../../dialogos/pedido-crear-dialog/pedido-crear-dialog.component';

@Component({
  selector: 'jhi-dummy',
  templateUrl: './dummy.component.html',
  styles: []
})
export class DummyComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  abrirDialog() {
    const dialogRef = this.dialog.open(PedidoCrearDialogComponent);
    dialogRef.afterClosed().subscribe(() => {
      console.log('closed');
    });
  }

}
