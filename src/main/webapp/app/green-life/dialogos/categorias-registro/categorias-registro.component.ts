import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaAlimentacion } from '../../../entities/categoria-alimentacion';
import { CategoriaAlimentacionService } from '../../../entities/categoria-alimentacion/categoria-alimentacion.service';
import { CategoriasModificarComponent } from '../categorias-modificar/categorias-modificar.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Comercio, ComercioService } from '../../../entities/comercio';
import {CommonAdapterService} from '../../shared/services/common-adapter.service';

@Component({
  selector: 'jhi-categorias-registro',
  templateUrl: './categorias-registro.component.html',
  styleUrls: ['categorias-registro.component.scss']
})
export class CategoriasRegistroComponent implements OnInit {

  categoriaForm: FormGroup;
  categoria: CategoriaAlimentacion;
  comercio: Comercio;

  constructor(
      private formBuilder: FormBuilder,
      private categoriaService: CategoriaAlimentacionService,
      public dialogRef: MatDialogRef<CategoriasModificarComponent>,
      private comercioService: ComercioService,
      @Inject(MAT_DIALOG_DATA) public data: number,
      private commonAdapterService: CommonAdapterService) { }

  ngOnInit() {
      this.categoriaForm = this.formBuilder.group({
          nombre: ['', [Validators.required]],
          descripcion: ['', []]
      });
  }

  crearCategoria() {
      if (this.categoriaForm.valid) {
          const categoria = new CategoriaAlimentacion();
          categoria.nombre = this.categoriaForm.get('nombre').value;
          if (this.categoriaForm.get('descripcion').value) {
              categoria.descripcion = this.categoriaForm.get('descripcion').value;
          }

          this.categoriaService.create(categoria).subscribe((resul) => {
              this.comercioService.find(this.data).subscribe((result) => {
                  this.comercio = result.body;
                  this.comercio.categorias.push(resul.body);
                  this.comercio.fechaCreacion = this.commonAdapterService.dateToJHILocalDate(new Date(this.comercio.fechaCreacion));
                  this.comercioService.update(this.comercio).subscribe((httpResponse) => {
                      console.log(httpResponse);
                  });
              });
              this.dialogRef.close();
          });
      }
  }

}
