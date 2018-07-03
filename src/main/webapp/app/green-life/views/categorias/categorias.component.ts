import { Component, OnInit } from '@angular/core';
import { CategoriaAlimentacion } from '../../../entities/categoria-alimentacion';
import { CategoriaAlimentacionService } from './../../../entities/categoria-alimentacion/categoria-alimentacion.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {JhiAlertService} from 'ng-jhipster';
import { MatDialog } from '@angular/material';
import { CategoriasRegistroComponent } from '../../dialogos/categorias-registro/categorias-registro.component';

@Component({
  selector: 'jhi-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

    categorias: CategoriaAlimentacion[];
    currentSearch: string;

  constructor(
      private categoriaService: CategoriaAlimentacionService,
      private activatedRoute: ActivatedRoute,
      private jhiAlertService: JhiAlertService,
      private dialog: MatDialog) {
      this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
      this.activatedRoute.snapshot.params['search'] : '';
  }

  ngOnInit() {
      this.getCategorias();
  }

  getCategorias(): void {
      if (this.currentSearch) {
          this.categoriaService.search({
              query: this.currentSearch,
          }).subscribe(
              (res: HttpResponse<CategoriaAlimentacion[]>) => this.categorias = res.body,
              (res: HttpErrorResponse) => this.onError(res.message)
          );
          return;
      }
      this.categoriaService.query().subscribe(
          (res: HttpResponse<CategoriaAlimentacion[]>) => {
              this.categorias = res.body;
              this.currentSearch = '';
          },
          (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    agregarCategoria() {
        const res = this.dialog.open(CategoriasRegistroComponent, {
            width: '600px'
        });
    }

    eliminarCategoria(pcategoria: CategoriaAlimentacion) {
        this.categoriaService.delete(pcategoria.id).subscribe((resul) => {
            console.log(resul);
            this.getCategorias();
        });
    }

}
