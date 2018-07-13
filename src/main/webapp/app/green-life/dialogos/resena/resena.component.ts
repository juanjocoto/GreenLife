import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonAdapterService, JHILocalDate} from '../../shared/services/common-adapter.service';
import {Router, ActivatedRoute} from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'jhi-resena',
  templateUrl: './resena.component.html',
  styleUrls: [`resena.component.scss`]
})
export class ResenaComponent implements OnInit {

    estrellas: boolean[] = [true, true, true, true, true];
    clasificacion: number;
    resena: string;
    calificacionForm: FormGroup;

    constructor(
        private commonAdapterService: CommonAdapterService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<ResenaComponent>
    ) { }

  ngOnInit() {
      this.calificacionForm = this.formBuilder.group({
          comentario: ['', [Validators.required]]
      });
  }

  setEstrella(data: any): void {
        this.clasificacion = data + 1;
        for ( let i = 0; i <= 4; i++ ) {
            if ( i <= data ) {
                this.estrellas[i] = false;
            } else {
                this.estrellas[i] = true;
            }
        }
  }

  agregar(): void {
        if (this.calificacionForm.valid) {
            this.resena = this.calificacionForm.get('comentario').value;
        }
        const resena = [this.clasificacion, this.resena];

        this.dialogRef.close(resena);
  }
}
