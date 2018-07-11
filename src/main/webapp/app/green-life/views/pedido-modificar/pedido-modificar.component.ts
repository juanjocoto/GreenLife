import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { ConfirmacionDialogComponent } from '../../dialogos/confirmacion-dialog/confirmacion-dialog.component';
import { DiaEntrega } from '../../../entities/dia-entrega/dia-entrega.model';
import { DiaEntregaService } from '../../../entities/dia-entrega';
import { HorasEntregaService } from '../../shared/services/horas-entrega.service';
import { LineaProducto } from '../../../entities/linea-producto/linea-producto.model';
import { LineaProductoService } from '../../../entities/linea-producto';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { Pedido } from '../../../entities/pedido';
import { PedidoService } from '../../../entities/pedido/pedido.service';
import { Producto } from '../../../entities/producto/producto.model';
import { ProductoService } from '../../../entities/producto';
import { SuscripcionService } from '../../../entities/suscripcion';

@Component({
  selector: 'jhi-pedido-modificar',
  templateUrl: './pedido-modificar.component.html',
  styleUrls: ['pedido-modificar.component.scss']
})
export class PedidoModificarComponent implements OnInit {

  productosTableColumns = ['nombre', 'costo', 'accion'];
  lineasTableColumns = ['nombre', 'cantidad', 'total', 'accion'];
  diasEntrega: DiaEntrega[] = [];
  horasEntrega: string[];
  productos: Producto[] = [];
  listaLineas: Linea[] = [];
  formulario: FormGroup;
  pedido = new Pedido();

  deletedLineas: Linea[] = [];

  get montoTotalPedido() {
    if (this.listaLineas.length < 1) {
      return 0;
    }
    return this.listaLineas
      .map((linea: Linea) => linea.cantidad * linea.producto.precio)
      .reduce((acumulado, valor) => acumulado + valor);
  }

  constructor(
    private route: ActivatedRoute,
    private suscripcionService: SuscripcionService,
    private diaEntregaService: DiaEntregaService,
    private productoService: ProductoService,
    private horasEntregaService: HorasEntregaService,
    private pedidoService: PedidoService,
    private lineaProductoService: LineaProductoService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private location: Location
  ) { }

  ngOnInit() {

    this.formulario = this.formBuilder.group({
      dia: ['', [
        Validators.required
      ]],
      hora: ['', [
        Validators.required
      ]]
    });

    this.diaEntregaService.getAll().subscribe((response) => {
      this.diasEntrega = response.body;
      this.horasEntrega = this.horasEntregaService.getHoras();
      this.route.params.subscribe((params) => {
        this.pedidoService.find(params['pedidoId']).subscribe((httpResponse) => {

          this.pedido = Object.assign(this.pedido, httpResponse.body);

          this.formulario.get('hora').setValue(this.pedido.hora);
          this.formulario.get('dia').setValue(this.pedido.diasEntregaId);
          this.suscripcionService.find(this.pedido.suscripcionId).subscribe((suscripcionResponse) => {
            const suscripcion = suscripcionResponse.body;

            this.productoService.findByComercio(suscripcion.comercioId)
              .subscribe((productoResponse) => {
                this.productos = productoResponse.body;
                this.lineaProductoService.findByPedidoId(this.pedido.id).subscribe((lineaResponse) => {
                  console.log(lineaResponse.body);
                  lineaResponse.body.forEach((linea: Linea) => linea.producto = this.getProducto(linea.productoId));
                  this.listaLineas = lineaResponse.body as Linea[];
                  this.filterProductList();
                });
              });
          });
        });
      });
    });
  }

  agregarLinea(producto: Producto) {
    const linea = new Linea();
    linea.productoId = producto.id;
    linea.cantidad = 1;
    linea.producto = producto;
    linea.pedidoId = this.pedido.id;
    this.listaLineas.push(linea);

    const index = this.productos.indexOf(producto);
    this.productos.splice(index, 1);
    this.refreshTables();
  }

  removerLinea(linea: Linea) {
    const index = this.listaLineas.indexOf(linea);
    this.listaLineas.splice(index, 1);
    this.productos.push(linea.producto);

    if (linea.id) {
      this.deletedLineas.push(linea);
    }

    this.refreshTables();
  }

  guardar() {
    if (this.formulario.valid && this.listaLineas && this.listaLineas.length > 0) {

      const lineas = this.listaLineas.filter((linea) => linea.cantidad > 0).map((linea) => {
        return {
          id: linea.id,
          cantidad: linea.cantidad,
          pedidoId: linea.pedidoId,
          productoId: linea.productoId
        };
      });
      let observable;
      if (this.deletedLineas.length > 0) {
        observable = Observable.zip(
          this.pedidoService.update(this.pedido),
          this.lineaProductoService.updateMany(lineas),
          this.lineaProductoService.deleteMany(this.deletedLineas)
        );
      } else {
        observable = Observable.zip(
          this.pedidoService.update(this.pedido),
          this.lineaProductoService.updateMany(lineas)
        );
      }

      observable.subscribe((result) => {
        console.log(result);
        this.location.back();
      }, (err) => {
        console.log(err);
      });
    } else {
      this.formulario.updateValueAndValidity();
    }
  }

  eliminar() {
    const dialogRef = this.dialog.open(ConfirmacionDialogComponent);
    dialogRef.componentInstance.texto = '¿Desea eliminar este pedido?';
    dialogRef.afterClosed().subscribe((resul) => {
      if (resul) {
        const lineas = this.listaLineas.filter((linea) => linea.id);
        if (lineas.length > 0) {
          this.lineaProductoService.deleteMany(lineas).subscribe((lineResponse) => {
            console.log(lineResponse);
            this.pedidoService.delete(this.pedido.id).subscribe((response) => this.location.back());
          });
        } else {
          this.pedidoService.delete(this.pedido.id).subscribe((response) => this.location.back());
        }
      }
    });
  }

  private filterProductList() {
    for (const linea of this.listaLineas) {
      let index: number;
      for (let i = 0; i < this.productos.length; i++) {
        const prod = this.productos[i];
        if (prod.id === linea.productoId) {
          index = i;
          break;
        }
      }
      this.productos.splice(index, 1);
    }
    this.refreshTables();
  }

  private refreshTables() {
    this.productos = [...this.productos];
    this.listaLineas = [...this.listaLineas];
  }

  private getProducto(productoId: number) {
    return this.productos.filter((a) => a.id === productoId)[0];
  }

}

class Linea extends LineaProducto {
  public producto?: Producto;

  public get origin(): LineaProducto {
    return {
      id: this.id,
      cantidad: this.cantidad,
      productoId: this.productoId,
      pedidoId: this.pedidoId
    };
  }
}
