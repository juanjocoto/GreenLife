import { Component, OnInit } from '@angular/core';
import { CategoriaAlimentacion } from '../../../entities/categoria-alimentacion';
import { CategoriaAlimentacionService } from './../../../entities/categoria-alimentacion/categoria-alimentacion.service';
import {ActivatedRoute} from '@angular/router';
import {JhiAlertService} from 'ng-jhipster';
import { MatDialog } from '@angular/material';
import { CategoriasRegistroComponent } from '../../dialogos/categorias-registro/categorias-registro.component';
import { CategoriasModificarComponent } from '../../dialogos/categorias-modificar/categorias-modificar.component';
import { Comercio, ComercioService } from '../../../entities/comercio';
import {CommonAdapterService} from '../../shared/services/common-adapter.service';

@Component({
  selector: 'jhi-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

    categoriasDefault: CategoriaAlimentacion[] = [];
    categorias: CategoriaAlimentacion[] = [];
    currentSearch: string;
    comercio: Comercio;

  constructor(
      private categoriaService: CategoriaAlimentacionService,
      private comercioService: ComercioService,
      private route: ActivatedRoute,
      private jhiAlertService: JhiAlertService,
      private dialog: MatDialog,
      private commonAdapterService: CommonAdapterService) {
  }

  ngOnInit() {
      for (let i = 1; i < 7; i++) {
          this.categoriaService.find(i).subscribe((resul) => {
             this.categoriasDefault.push(resul.body);
          });
      }
      this.getCategorias();
  }

  getCategorias(): void {
      this.route.params.subscribe((params) => {
          const comercioId = params['comercioId'];
          this.comercioService.find(comercioId).subscribe((resul) => {
              this.comercio = resul.body;
              this.categorias = this.comercio.categorias;
          });
      });
  }

  agregarCategoria() {
      const res = this.dialog.open(CategoriasRegistroComponent, {
          width: '600px',
          data: this.comercio.id
      });

      res.afterClosed().subscribe(() => {
          this.getCategorias();
      });
  }

  eliminarCategoria(pcategoria: CategoriaAlimentacion) {
      const index = this.comercio.categorias.indexOf(pcategoria);

      if (index >= 0) {
          this.comercio.categorias.splice(index, 1);
      }

      this.comercio.fechaCreacion = this.commonAdapterService.dateToJHILocalDate(new Date(this.comercio.fechaCreacion));
      this.comercioService.update(this.comercio).subscribe((httpResponse) => {
          this.categoriaService.delete(pcategoria.id).subscribe((result) => {
              console.log(result);
          });
      });
  }

  modificarCategoria(pcategoria: CategoriaAlimentacion) {
      const res = this.dialog.open(CategoriasModificarComponent, {
          width: '600px',
          data: pcategoria.id
      });

      res.afterClosed().subscribe(() => {
          this.getCategorias();
      });
  }
}
