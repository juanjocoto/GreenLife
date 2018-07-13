import {Component, Inject, OnInit} from '@angular/core';
import {Etiqueta, EtiquetaService} from '../../../entities/etiqueta';
import {CategoriasModificarComponent} from '../categorias-modificar/categorias-modificar.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Comercio, ComercioService} from '../../../entities/comercio';
import {Observable} from '../../../../../../../node_modules/rxjs';

@Component({
  selector: 'jhi-etiquetas-consultar',
  templateUrl: './etiquetas-consultar.component.html',
  styleUrls: ['etiquetas-consultar.component.scss']
})
export class EtiquetasConsultarComponent implements OnInit {

  etiquetas: Etiqueta[] = [];
  comercio: Comercio;

  constructor(
      private etiquetaService: EtiquetaService,
      public dialogRef: MatDialogRef<CategoriasModificarComponent>,
      private comercioService: ComercioService,
      @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit() {
      this.obtenerEtiquetas();
  }

  obtenerEtiquetas() {
      const comercio = this.comercioService.find(this.data);

      Observable.zip(comercio).subscribe((resul) => {
          this.comercio = resul[0].body;

          for (const index of this.comercio.etiquetas) {
              this.etiquetaService.find(index.id).subscribe((httpResponse) => {
                  this.etiquetas.push(httpResponse.body);
              });
          }
      });
  }
}
