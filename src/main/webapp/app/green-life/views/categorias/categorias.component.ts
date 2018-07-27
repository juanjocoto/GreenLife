import { Component, OnInit } from '@angular/core';
import { CategoriaAlimentacion } from '../../../entities/categoria-alimentacion';
import { CategoriaAlimentacionService } from './../../../entities/categoria-alimentacion/categoria-alimentacion.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {JhiAlertService} from 'ng-jhipster';
import { MatDialog } from '@angular/material';
import { CategoriasRegistroComponent } from '../../dialogos/categorias-registro/categorias-registro.component';
import { CategoriasModificarComponent } from '../../dialogos/categorias-modificar/categorias-modificar.component';
import { Comercio, ComercioService } from '../../../entities/comercio';

@Component({
  selector: 'jhi-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

    categorias: CategoriaAlimentacion[] = [];
    categoriasDefault: CategoriaAlimentacion[] = [];
    currentSearch: string;
    comercio: Comercio;

  constructor(
      private categoriaService: CategoriaAlimentacionService,
      private comercioService: ComercioService,
      private activatedRoute: ActivatedRoute,
      private jhiAlertService: JhiAlertService,
      private dialog: MatDialog) {
  }

  ngOnInit() {
      for (let i = 1; i < 7; i++) {
          this.categoriaService.find(i).subscribe((resul) => {
             this.categoriasDefault.push(resul.body);
          });
      }
  }

  getCategorias(): void {

  }

  agregarCategoria() {
      const res = this.dialog.open(CategoriasRegistroComponent, {
          width: '600px'
      });

      res.afterClosed().subscribe(() => {
          this.getCategorias();
      });
  }

  eliminarCategoria(pcategoria: CategoriaAlimentacion) {
      this.categoriaService.delete(pcategoria.id).subscribe((resul) => {
          console.log(resul);
          this.getCategorias();
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
