import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { map, startWith } from 'rxjs/operators';

import { Etiqueta } from '../../../entities/etiqueta/etiqueta.model';
import { EtiquetaService } from '../../../entities/etiqueta/etiqueta.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'jhi-selector-etiquetas',
  templateUrl: './selector-etiquetas.component.html',
  styles: [`mat-form-field {width:100%}`]
})
export class SelectorEtiquetasComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  etiquetaCtrl = new FormControl();
  etiquetasFiltradas: Observable<Etiqueta[]>;
  @Input() model: Etiqueta[] = [];
  @Input() placeholder = 'Etiquetas';
  etiquetas: Etiqueta[] = [];

  @ViewChild('etiquetaInput') etiquetaInput: ElementRef;

  constructor(private etiquetaService: EtiquetaService) {
    this.etiquetasFiltradas = this.etiquetaCtrl.valueChanges.pipe(
      startWith(null),
      map((etiqueta: Etiqueta | null) => etiqueta ? this._filter(etiqueta) : this.etiquetas.slice()));
  }

  ngOnInit(): void {
    this.etiquetaService.getAll().subscribe((httpResponse) => {
      console.log(httpResponse.body);
      this.etiquetas = httpResponse.body;
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      const fitrado = this.etiquetas.filter((etiqueta) => etiqueta.nombre.toLowerCase() === value.toLocaleLowerCase().trim());
      if (!fitrado[0]) {
        const etiqueta = new Etiqueta();
        etiqueta.nombre = this.capitalizeFirstLetter(value.trim().toLocaleLowerCase());
        etiqueta.disponible = true;

        this.etiquetaService.create(etiqueta).subscribe((httpResponse) => {
          etiqueta.id = httpResponse.body.id;

          this.etiquetas.push(etiqueta);
          this.model.push(etiqueta);
        });
      } else {
        this.model.push(fitrado[0]);
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.etiquetaCtrl.setValue(null);
  }

  remove(etiqueta: Etiqueta): void {
    const index = this.model.indexOf(etiqueta);

    if (index >= 0) {
      this.model.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {

    console.log('selected');

    const fitrado = this.etiquetas.filter((etiqueta) => etiqueta.nombre.toLowerCase() === event.option.viewValue.toLocaleLowerCase().trim());

    this.model.push(fitrado[0]);
    this.etiquetaInput.nativeElement.value = '';
    this.etiquetaCtrl.setValue(null);
  }

  private _filter(value: string | Etiqueta): Etiqueta[] {
    let filterValue: string;
    if (typeof value === 'string') {

      filterValue = value.toLowerCase();
    } else {
      filterValue = value.nombre.toLocaleLowerCase();
    }

    return this.etiquetas.filter((etiqueta) => etiqueta.nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  private capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
