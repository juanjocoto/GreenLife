import { Component, OnInit, Inject } from '@angular/core';
import { CategoriaAlimentacion } from '../../../entities/categoria-alimentacion';
import { CategoriaAlimentacionService } from '../../../entities/categoria-alimentacion/categoria-alimentacion.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpResponse} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'jhi-categorias-modificar',
  templateUrl: './categorias-modificar.component.html',
  styleUrls: ['categorias-modificar.component.scss']
})
export class CategoriasModificarComponent implements OnInit {

  formCategoria: FormGroup;
  categoria: CategoriaAlimentacion;

  constructor(
      private formBuilder: FormBuilder,
      private categoriaService: CategoriaAlimentacionService,
      public dialogRef: MatDialogRef<CategoriasModificarComponent>,
      @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit() {
      this.categoriaService.find(this.data).subscribe((result) => {
          this.categoria = result.body;

          this.formCategoria = this.formBuilder.group({
              nombre: [this.categoria.nombre, [
                  Validators.required,
              ]],
              descr: [this.categoria.descripcion, []]
          });
      });
  }

  modificarCategoria() {
      this.categoria.nombre = this.formCategoria.get('nombre').value;
      this.categoria.descripcion = this.formCategoria.get('descr').value;

      if (this.formCategoria.valid) {
          this.categoriaService.update(this.categoria).subscribe((result) => {
              this.dialogRef.close();
          });
      }
  }

}
