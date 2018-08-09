import { CadenaEntrega, CadenaEntregaService, EstadoCadena } from '../../../entities/cadena-entrega';
import { Comercio, ComercioService } from '../../../entities/comercio';
import { Component, Input, OnInit } from '@angular/core';

import { AccountService } from './../../../shared/auth/account.service';
import { Entrega } from './../../../entities/entrega/entrega.model';
import { EntregaService } from './../../../entities/entrega/entrega.service';
import { JHILocalDate } from '../../shared/services/common-adapter.service';
import { LineaEntrega } from '../../../entities/linea-entrega';
import { MatDialog } from '@angular/material';
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
    const ref = this.dialog.open(EstadoEntregaDialogComponet);
    ref.componentInstance.entrega = entrega;
  }
}

@Component({
  selector: 'jhi-estado-entrega-dialog',
  template: `
  <h1>Hello</h1>
  <mat-form-field>
    <mat-select placeholder="Estado">
      <mat-option *ngFor="let estado of estados" [value]="estado.value">
        {{estado.text}}
      </mat-option>
    </mat-select>
  </mat-form-field>
  <mat-form-field>
    <textarea matInput placeholder="Información"></textarea>
  </mat-form-field>
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
    private cadenaEntregaService: CadenaEntregaService
  ) { }

  public valueChange(value: string) {
    const cadena = new CadenaEntrega();
    cadena.estado = this.values.indexOf(value);
    cadena.fecha = new JHILocalDate();
    cadena.info = '';
  }

  ngOnInit(): void {

  }

}
