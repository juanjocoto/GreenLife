import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto, ProductoService } from '../../../entities/producto';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmacionDialogComponent } from '../../dialogos/confirmacion-dialog/confirmacion-dialog.component';
import { CommonAdapterService } from '../../shared/services/common-adapter.service';

@Component({
  selector: 'jhi-comercios-productos',
  templateUrl: './comercios-productos.component.html',
  styleUrls: ['comercios-productos.component.scss']
})
export class ComerciosProductosComponent implements AfterViewInit {

  displayedColumns = ['nombre', 'precio', 'delete'];
  dataSource: MatTableDataSource<Producto> = new MatTableDataSource<Producto>([]);
  formulario: FormGroup;
  productoSeleccionado: Producto;
  cantProductos = 0;
  productoId = -1;
  comercioId = -1;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productosService: ProductoService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private commonAdapter: CommonAdapterService) {
    this.obtenerProductos();
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Productos por página';
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  seleccionarProducto(producto) {
    this.productoSeleccionado = producto;
    this.productoId = producto.id;
    this.formulario.patchValue({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
    });
  }

  agregarProducto() {
    const ref = this.dialog.open(ConfirmacionDialogComponent);
    ref.componentInstance.texto = `¿Desea agregar un nuevo producto?`;
    ref.afterClosed().subscribe((result) => {
      if (result) {
        const productoNuevo: Producto = new Producto();
        productoNuevo.nombre = this.formulario.controls['nombre'].value;
        productoNuevo.descripcion = this.formulario.controls['descripcion'].value;
        productoNuevo.precio = this.formulario.controls['precio'].value;
        productoNuevo.comercioId = this.comercioId;
        productoNuevo.fechaCreacion = this.commonAdapter.dateToJHILocalDate(new Date());
        this.productosService.update(productoNuevo).subscribe((resul) => {
          if (resul.status === 201) {
            this.snackBar.open('El producto ha sido agregado', undefined, { duration: 2000 });
            this.obtenerProductos();
          } else {
            this.snackBar.open('Se generó un error', undefined, { duration: 2000 });
          }
          this.cancelar();
        });
      }
    });
  }

  obtenerProductos() {
    this.route.params.subscribe((params) => {
      this.comercioId = params['comercioId'];
      this.productosService.findByComercio(params['comercioId']).subscribe((resul) => {
        this.dataSource = new MatTableDataSource<Producto>(resul.body);
        this.cantProductos = this.dataSource.data.length;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  actualizarProducto() {
    const ref = this.dialog.open(ConfirmacionDialogComponent);
    ref.componentInstance.texto = `¿Desea actualizar el producto ${this.productoSeleccionado.nombre}?`;
    ref.afterClosed().subscribe((result) => {
      if (result) {
        const productoNuevo = this.productoSeleccionado;
        productoNuevo.nombre = this.formulario.controls['nombre'].value;
        productoNuevo.descripcion = this.formulario.controls['descripcion'].value;
        productoNuevo.precio = this.formulario.controls['precio'].value;
        productoNuevo.fechaCreacion = this.commonAdapter.dateToJHILocalDate(this.productoSeleccionado.fechaCreacion);
        this.productosService.update(productoNuevo).subscribe((resul) => {
          if (resul.status === 200) {
            this.snackBar.open('El producto ha sido actualizado', undefined, { duration: 2000 });
            this.obtenerProductos();
          } else {
            this.snackBar.open('Se generó un error', undefined, { duration: 2000 });
          }
          this.cancelar();
        });
      }
    });
  }

  eliminarProducto(producto) {
    const ref = this.dialog.open(ConfirmacionDialogComponent);
    ref.componentInstance.texto = `¿Desea eliminar el producto ${producto.nombre}?`;
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.productosService.delete(producto.id).subscribe((resul) => {
          if (resul.status === 200) {
            this.snackBar.open('El producto ha sido eliminado', undefined, { duration: 2000 });
          } else {
            this.snackBar.open('Se generó un error', undefined, { duration: 2000 });
          }
          this.obtenerProductos();
          this.cancelar();
        });
      }
    });
  }

  cancelar() {
    this.productoSeleccionado = null;
    this.productoId = -1;
    this.formulario.patchValue({
      nombre: '',
      descripcion: '',
      precio: '',
    });
  }

  atras() {
    this.router.navigate(['/miscomercios']);
  }
}
