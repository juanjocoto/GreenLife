import { Component, OnInit } from '@angular/core';
import { map, startWith } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import { Comercio } from '../../../entities/comercio';
import { ComercioService } from '../../../entities/comercio/comercio.service';
import { Etiqueta } from '../../../entities/etiqueta/etiqueta.model';
import { EtiquetaService } from '../../../entities/etiqueta/etiqueta.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'jhi-comercio-editar',
  templateUrl: './comercio-editar.component.html',
  styles: [`
  .example-form {
    min-width: 150px;
    max-width: 500px;
    width: 100%;
  }

  .example-full-width {
    width: 100%;
  }
  `]
})
export class ComercioEditarComponent implements OnInit {

  myControl = new FormControl();
  etiquetas: Etiqueta[];
  filteredOptions: Observable<string[]>;
  comercio: Comercio;

  get options() {
    return this.etiquetas.map((etiqueta) => etiqueta.nombre);
  }

  constructor(private route: ActivatedRoute,
    private comercioService: ComercioService,
    private etiquetaService: EtiquetaService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.comercioService.find(params.comercioId).subscribe((httpResponse) => {
        this.comercio = httpResponse.body;
      });
    });

    this.etiquetaService.getAll().subscribe((httpResponse) => {
      this.etiquetas = httpResponse.body;
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map((value) => this._filter(value))
        );
    });
  }

  agregarEtiqueta() {
    const textoEtiqueta = this.myControl.value as string;

    if (textoEtiqueta !== '') {
      const etiqueta = this.etiquetas.filter((a) => a.nombre === textoEtiqueta)[0];
      if (!etiqueta) {
        const reqEtiqueta = new Etiqueta();
        reqEtiqueta.nombre = textoEtiqueta;
        reqEtiqueta.disponible = true;
        this.etiquetaService.create(reqEtiqueta).subscribe((httpResponse) => {
          this.etiquetas.push(httpResponse.body);
          this.comercio.etiquetas.push(httpResponse.body);
          this.myControl.setValue('');
        });
      } else {
        if (!this.comercio.etiquetas.includes(etiqueta)) {
          this.comercio.etiquetas.push(etiqueta);
        }
      }
    }

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) => option.toLowerCase().includes(filterValue));
  }

}
