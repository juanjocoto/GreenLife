import { Component, Input, OnInit } from '@angular/core';

import { AccountService } from '../../../shared/auth/account.service';
import { Comercio } from '../../../entities/comercio/comercio.model';
import { DiaEntrega } from '../../../entities/dia-entrega/dia-entrega.model';
import { DiaEntregaService } from '../../../entities/dia-entrega/dia-entrega.service';
import { Pedido } from '../../../entities/pedido';
import { PedidoService } from '../../../entities/pedido/pedido.service';
import { Suscripcion } from '../../../entities/suscripcion/suscripcion.model';

@Component({
  selector: 'jhi-pedido-crear-dialog',
  templateUrl: './pedido-crear-dialog.component.html',
  styles: []
})
export class PedidoCrearDialogComponent implements OnInit {

  @Input() suscripcion: Suscripcion;

  diasEntrega: DiaEntrega[];

  constructor(private accountService: AccountService,
    private pedidoService: PedidoService,
    private diaEntregaService: DiaEntregaService
  ) { }

  ngOnInit() {
    this.diaEntregaService.getAll().subscribe((httpResponse) => {
      this.diasEntrega = httpResponse.body;
    });
  }

  crear() {
    this.accountService.get().subscribe((httpResponse) => {
      const pedido = new Pedido();
      pedido.localId = undefined;
      pedido.suscripcionId = this.suscripcion.id;
      pedido.lineas = [];
      pedido.localId = undefined;
      pedido.diasEntregaId = 0;
      // pedido.
      console.log(httpResponse.body);

    });

  }

}
