import { CadenaEntrega, CadenaEntregaService, EstadoCadena } from '../../../entities/cadena-entrega';
import { Comercio, ComercioService } from '../../../entities/comercio';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';

import { AccountService } from './../../../shared/auth/account.service';
import { Entrega } from './../../../entities/entrega/entrega.model';
import { EntregaService } from './../../../entities/entrega/entrega.service';
import { JHILocalDate } from '../../shared/services/common-adapter.service';
import { LineaEntrega } from '../../../entities/linea-entrega';
import { UsuarioService } from './../../../entities/usuario/usuario.service';

@Component({
  selector: 'jhi-entrega-list',
  templateUrl: './entrega-list.component.html',
  styleUrls: ['entrega-list.component.scss']
})
export class EntregaListComponent implements OnInit {

  public comercios: Comercio[] = [];
  public entregaMap = new Map<number, Entrega[]>();

  constructor(
    private accountService: AccountService,
    private usuarioService: UsuarioService,
    private comercioService: ComercioService,
    private entregaService: EntregaService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

    this.accountService.get().subscribe((accoutResult) => {
      this.usuarioService.findByUserLogin((accoutResult.body as any).login).subscribe((usuarioResult) => {
        this.comercioService.findComerciosByDueno(usuarioResult.body.id).subscribe((comerciosResult) => {
          for (const comercio of comerciosResult.body) {
            this.entregaService.findByComercio(comercio).subscribe((entregasResult) => {
              this.entregaMap.set(comercio.id, entregasResult.body);
              this.comercios = comerciosResult.body;
            });
          }
        });
      });
    });
  }

  public calcMonto(lineas: LineaEntrega[]) {
    if (lineas.length < 1) {
      return 0;
    }
    return lineas
      .map((linea: LineaEntrega) => linea.cantidad * linea.producto.precio)
      .reduce((acumulado, valor) => acumulado + valor);

  }

  public editEstado(entrega: Entrega) {
    const ref = this.dialog.open(EstadoEntregaDialogComponet, { width: '300px' });
    ref.componentInstance.entrega = entrega;
    ref.afterClosed().subscribe((cadena: CadenaEntrega) => {
      entrega.cadena = cadena;
      entrega.cadenaId = cadena.id;
    });
  }
}

@Component({
  selector: 'jhi-estado-entrega-dialog',
  styles: [`mat-form-field{width:100%}`],
  template: `
  <h1 mat-dialog-title>Hello</h1>
  <mat-dialog-content>
    <form [formGroup]="formGroup" class="green-life-form">
      <mat-form-field>
        <mat-select placeholder="Estado" formControlName="estado">
          <mat-option *ngFor="let estado of estados" [value]="estado.value">
            {{estado.text}}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <textarea matInput placeholder="Información" formControlName="info"></textarea>
      </mat-form-field>
    </form>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button class="btn btn-danger" mat-dialog-close>Cerrar</button>
    <div class="spacer"></div>
    <button class="btn btn-success" [disabled]="!formGroup.valid" (click)="save()">Crear</button>
  </mat-dialog-actions>
  `
  // templateUrl: './entrega-list.component.html',
  // styleUrls: ['entrega-list.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class EstadoEntregaDialogComponet implements OnInit {
  @Input() entrega: Entrega;

  private _estados: { text: string, value: string }[] = [
    { text: 'Preparación', value: 'PREPARACION' },
    { text: 'En camino', value: 'EN_CAMINO' },
    { text: 'Entregado', value: 'ENTREGADO' },
    { text: 'Pendiente', value: 'PENDIENTE' },
  ];

  public formGroup: FormGroup;

  public get estados() {
    return this._estados.filter((estado) => estado.value !== this.entrega.cadena['estado']);
  }

  private values = [
    'PREPARACION',
    'EN_CAMINO',
    'ENTREGADO',
    'PENDIENTE'
  ];

  constructor(
    private entregaService: EntregaService,
    private cadenaEntregaService: CadenaEntregaService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EstadoEntregaDialogComponet>
  ) { }

  public save() {
    const index = this.values.indexOf(this.formGroup.get('estado').value);
    if (this.formGroup.valid && index > -1) {
      const cadena = new CadenaEntrega();
      cadena.estado = index;
      cadena.fecha = new JHILocalDate();
      cadena.info = this.formGroup.get('info').value;
      cadena.previoId = this.entrega.cadenaId;
      this.cadenaEntregaService.create(cadena).subscribe((response) => {
        console.log(response.body);
        this.dialogRef.close(response.body);
      });
    }
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      estado: ['', [Validators.required]],
      info: ['', [Validators.required]]
    });
  }

}
