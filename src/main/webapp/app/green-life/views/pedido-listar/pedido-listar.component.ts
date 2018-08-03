import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AccountService } from '../../../shared/auth/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import { ConfirmacionDialogComponent } from '../../dialogos/confirmacion-dialog/confirmacion-dialog.component';
import { LineaProducto } from './../../../entities/linea-producto/linea-producto.model';
import { LineaProductoService } from '../../../entities/linea-producto';
import { Observable } from 'rxjs';
import { Pedido } from '../../../entities/pedido';
import { PedidoService } from './../../../entities/pedido/pedido.service';
import { User } from '../../../shared';

@Component({
  selector: 'jhi-pedido-listar',
  templateUrl: './pedido-listar.component.html',
  styleUrls: ['pedido-listar.component.scss']
})
export class PedidoListarComponent implements OnInit {

  pedidos: Pedido[] = [];
  clienteDetail = new User();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pedidoService: PedidoService,
    private lineaService: LineaProductoService,
    private auth: AccountService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.auth.get().subscribe((httpresponse) => {
      this.clienteDetail = httpresponse.body;
    });

    this.route.params.subscribe((params) => {
      const suscripcionId = params['suscripcionId'];
      this.pedidoService.findBySuscripcionId(suscripcionId).subscribe((httpResponse) => {
        const pedidos = httpResponse.body;
        for (const pedido of pedidos) {
          pedido.lineas = [];
          this.lineaService.findByPedidoId(pedido.id).subscribe((lineaResponse) => {
            pedido.lineas = lineaResponse.body;
          });
        }
        this.pedidos = pedidos;
        console.log(this.pedidos);
      });
    });
  }

  getMontoTotal(lineas: LineaProducto[]) {
    if (lineas.length < 1) {
      return 0;
    }
    return lineas.map((linea: any) => linea.cantidad * linea.producto.precio).reduce((acumulado, valor) => acumulado + valor);
  }

  showDeleteDialog(pedido: Pedido) {
    const dialogRef = this.dialog.open(ConfirmacionDialogComponent);
    dialogRef.componentInstance.texto = '¿Desea eliminar el pedido?';
    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        const lineas = pedido.lineas.filter((linea) => linea.id);
        this.lineaService.deleteMany(lineas).subscribe((lineResponse) => {
          console.log(lineResponse);
          this.pedidoService.delete(pedido.id).subscribe(() => {
            this.snackBar.open('El pedido fué eliminado', undefined, { duration: 2000 });
            const index = this.pedidos.indexOf(pedido);
            this.pedidos.splice(index, 1);
          });
        });
      }
    });
  }

  irAtras() {
      this.router.navigate(['app/suscripciones']);
  }

}
