import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaAlimentacion } from '../../../entities/categoria-alimentacion';
import { CategoriaAlimentacionService } from '../../../entities/categoria-alimentacion/categoria-alimentacion.service';

@Component({
  selector: 'jhi-categorias-registro',
  templateUrl: './categorias-registro.component.html',
  styleUrls: ['categorias-registro.component.scss']
})
export class CategoriasRegistroComponent implements OnInit {

  categoriaForm: FormGroup;
  categoria: CategoriaAlimentacion;

  constructor(private formBuilder: FormBuilder,
  private categoriaService: CategoriaAlimentacionService) { }

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
              console.log(resul);
          });
      }
  }

}
