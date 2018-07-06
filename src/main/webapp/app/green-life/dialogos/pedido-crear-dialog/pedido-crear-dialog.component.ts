import { Component, Input, OnInit } from '@angular/core';

import { AccountService } from '../../../shared/auth/account.service';
import { Comercio } from '../../../entities/comercio/comercio.model';
import { DiaEntrega } from '../../../entities/dia-entrega/dia-entrega.model';
import { DiaEntregaService } from '../../../entities/dia-entrega/dia-entrega.service';
import { Pedido } from '../../../entities/pedido';
import { PedidoService } from '../../../entities/pedido/pedido.service';

@Component({
  selector: 'jhi-pedido-crear-dialog',
  templateUrl: './pedido-crear-dialog.component.html',
  styles: []
})
export class PedidoCrearDialogComponent implements OnInit {

  @Input() comercio: Comercio;

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
      pedido.diasEntregaId = undefined;
      pedido.localId = undefined;
      // pedido.
      console.log(httpResponse.body);

    });

  }

}
