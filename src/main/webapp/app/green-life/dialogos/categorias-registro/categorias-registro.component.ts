import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaAlimentacion } from '../../../entities/categoria-alimentacion';
import { CategoriaAlimentacionService } from '../../../entities/categoria-alimentacion/categoria-alimentacion.service';
import { CategoriasModificarComponent } from '../categorias-modificar/categorias-modificar.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Comercio, ComercioService } from '../../../entities/comercio';

@Component({
  selector: 'jhi-categorias-registro',
  templateUrl: './categorias-registro.component.html',
  styleUrls: ['categorias-registro.component.scss']
})
export class CategoriasRegistroComponent implements OnInit {

  categoriaForm: FormGroup;
  categoria: CategoriaAlimentacion;
  comercio: Comercio;

  constructor(private formBuilder: FormBuilder,
  private categoriaService: CategoriaAlimentacionService,
  public dialogRef: MatDialogRef<CategoriasModificarComponent>,
  private comercioService: ComercioService,
  @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit() {
      this.categoriaForm = this.formBuilder.group({
          nombre: ['', [Validators.required]],
          descripcion: ['', [Validators.required]]
      });
  }

  crearCategoria() {
      if (this.categoriaForm.valid) {
          const categoria = new CategoriaAlimentacion();
          categoria.nombre = this.categoriaForm.get('nombre').value;
          categoria.descripcion = this.categoriaForm.get('descripcion').value;

          this.categoriaService.create(categoria).subscribe((resul) => {
              this.comercioService.find(this.data).subscribe((result) => {
                 console.log(this.comercio.nombreComercial);
              });
              this.dialogRef.close();
          });
      }
  }

}
