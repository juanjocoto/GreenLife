import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto, ProductoService } from '../../../entities/producto';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'jhi-comercios-productos',
  templateUrl: './comercios-productos.component.html',
  styleUrls: ['comercios-productos.component.scss']
})
export class ComerciosProductosComponent implements AfterViewInit {

  displayedColumns = ['id', 'nombre', 'precio', 'delete'];
  dataSource: MatTableDataSource<Producto> = new MatTableDataSource<Producto>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute, private productosService: ProductoService, private formBuilder: FormBuilder) {
    this.route.params.subscribe((params) => {
      this.productosService.findByComercio(params['comercioId']).subscribe((resul) => {
        this.dataSource = new MatTableDataSource<Producto>(resul.body);
      });
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
