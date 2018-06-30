import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Producto, ProductoService } from '../../../entities/producto';

@Component({
  selector: 'jhi-comercios-productos',
  templateUrl: './comercios-productos.component.html',
  styleUrls: ['comercios-productos.component.scss']
})
export class ComerciosProductosComponent implements OnInit {

  listaProductos: Producto[];

  constructor(private route: ActivatedRoute, private productosService: ProductoService) { }

  ngOnInit() {
    this.getProductos();
  }

  getProductos() {
    this.route.params.subscribe((params) => {
      this.productosService.findByComercio(params['comercioId']).subscribe((productos) => {
        this.listaProductos = productos.body;
      });
    });
  }

}
