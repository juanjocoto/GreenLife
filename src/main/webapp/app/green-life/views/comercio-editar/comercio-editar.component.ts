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
  styles: []
})
export class ComercioEditarComponent implements OnInit {

  comercio: Comercio;

  constructor(private route: ActivatedRoute,
    private comercioService: ComercioService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.comercioService.find(params.comercioId).subscribe((httpResponse) => {
        this.comercio = httpResponse.body;
      });
    });
  }

}
