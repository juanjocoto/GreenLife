import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto, ProductoService } from '../../../entities/producto';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'jhi-comercios-productos',
  templateUrl: './comercios-productos.component.html',
  styleUrls: ['comercios-productos.component.scss']
})
export class ComerciosProductosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['id', 'nombre', 'precio', 'delete'];
  dataSource;
  selectedRowIndex = -1;
  productoSeleccionado = {nombre: '', descripcion: '', precio: ''};
  formulario: FormGroup;

  constructor(private route: ActivatedRoute, private productosService: ProductoService, private formBuilder: FormBuilder) {
    this.getProductos();
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
      ]],
      descripcion: ['', [
        Validators.required
      ]],
      precio: ['', [
        Validators.required
      ]]
    });

  }

  getProductos() {
    this.route.params.subscribe((params) => {
      this.productosService.findByComercio(params['comercioId']).subscribe((productos) => {
        console.log(productos.body);
        this.dataSource = new MatTableDataSource(productos.body);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  selectRow(row) {
      this.selectedRowIndex = row.id;
      this.productoSeleccionado = row;
  }

  delete(row) {
      console.log(row);
  }

  cancelar() {
    this.productoSeleccionado = {nombre: '', descripcion: '', precio: ''};
    this.selectedRowIndex = -1;
  }

}
