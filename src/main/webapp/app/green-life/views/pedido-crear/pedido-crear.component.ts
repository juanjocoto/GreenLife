import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { DiaEntrega } from '../../../entities/dia-entrega/dia-entrega.model';
import { DiaEntregaService } from '../../../entities/dia-entrega/dia-entrega.service';
import { HorasEntregaService } from '../../shared/services/horas-entrega.service';
import { LineaProducto } from '../../../entities/linea-producto';
import { LineaProductoService } from '../../../entities/linea-producto/linea-producto.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { Pedido } from '../../../entities/pedido';
import { PedidoService } from '../../../entities/pedido/pedido.service';
import { Producto } from '../../../entities/producto/producto.model';
import { ProductoService } from '../../../entities/producto/producto.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { Suscripcion } from '../../../entities/suscripcion';
import { SuscripcionService } from '../../../entities/suscripcion/suscripcion.service';

@Component({
  selector: 'jhi-pedido-crear',
  templateUrl: './pedido-crear.component.html',
  styleUrls: ['./pedido-crear.component.scss']
})
export class PedidoCrearComponent implements OnInit {

  @ViewChild('pedidoForm') form: ElementRef;

  private suscripcion: Suscripcion;
  productos: Producto[] = [];
  diasEntrega$: Observable<DiaEntrega[]>;
  horasEntrega: string[];
  pedido = new Pedido();
  productosTableColumns = ['nombre', 'costo', 'accion'];
  lineasTableColumns = ['nombre', 'cantidad', 'total', 'accion'];
  listaLineas: LineaProducto[] = [];

  formulario: FormGroup;

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
    private location: Location,
    private snackBarService: SnackBarService
  ) {
  }

  ngOnInit() {

    this.formulario = this.formBuilder.group({
      dia: ['', [
        Validators.required
      ]],
      hora: ['', [
        Validators.required
      ]]
    });

    this.route.params.subscribe((params) => {
      this.suscripcionService.find(params['suscripcionId']).subscribe((httpResponse) => {
        this.suscripcion = httpResponse.body;
        this.productoService.findByComercio(this.suscripcion.comercioId)
          .subscribe((productoResponse) => this.productos = productoResponse.body);
        this.pedido.suscripcionId = this.suscripcion.id;
      });
    });

    this.diasEntrega$ = this.diaEntregaService.getAll().map((httpResponse) => httpResponse.body);
    this.horasEntrega = this.horasEntregaService.getHoras();
  }

  agregarLinea(producto: Producto) {
    const linea = new Linea();
    linea.productoId = producto.id;
    linea.cantidad = 1;
    linea.producto = producto;
    this.listaLineas.push(linea);

    const index = this.productos.indexOf(producto);
    this.productos.splice(index, 1);
    this.refreshTables();
  }

  removerLinea(linea: Linea) {
    const index = this.listaLineas.indexOf(linea);
    this.listaLineas.splice(index, 1);
    this.productos.push(linea.producto);
    this.refreshTables();
  }

  guardar() {
    // (<HTMLFontElement>this.form.nativeElement).
    if (this.formulario.valid && this.listaLineas && this.listaLineas.length > 0) {
      this.pedido.lineas = this.listaLineas;
      this.pedidoService.create(this.pedido).subscribe((httpResponse) => {
        this.pedido.id = httpResponse.body.id;
        this.lineaProductoService.createMany(this.listaLineas.filter((linea) => linea.cantidad > 0).map((linea) => {
          return {
            id: linea.id,
            cantidad: linea.cantidad,
            pedidoId: httpResponse.body.id,
            productoId: linea.productoId
          };
        })).subscribe((response) => {
          this.location.back();
          this.snackBarService.show('El pedido fue creado');
        });
      });
    } else {
      this.formulario.updateValueAndValidity();
    }
  }

  private refreshTables() {
    this.productos = [...this.productos];
    this.listaLineas = [...this.listaLineas];
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
