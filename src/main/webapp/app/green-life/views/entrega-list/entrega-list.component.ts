import { Component, OnInit } from '@angular/core';

import { AccountService } from './../../../shared/auth/account.service';
import { ComercioService } from '../../../entities/comercio';
import { EntregaService } from './../../../entities/entrega/entrega.service';
import { UsuarioService } from './../../../entities/usuario/usuario.service';

@Component({
  selector: 'jhi-entrega-list',
  templateUrl: './entrega-list.component.html',
  styleUrls: ['entrega-list.component.scss']
})
export class EntregaListComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private usuarioService: UsuarioService,
    private comercioService: ComercioService,
    private entregaService: EntregaService
  ) { }

  ngOnInit() {
    this.accountService.get().subscribe((accoutResult) => {
      console.log(accoutResult.body);
      this.usuarioService.findByUserLogin((accoutResult.body as any).login).subscribe((usuarioResult) => {
        console.log(usuarioResult.body);
        this.comercioService.findComerciosByDueno(usuarioResult.body.id).subscribe((comerciosResult) => {
          console.log(comerciosResult.body);
          for (const comercio of comerciosResult.body) {
            this.entregaService.findByComercio(comercio).subscribe((entregasResult) => {
              for (const entrega of entregasResult.body) {
                console.log(entrega);
              }
            });
          }
        });
      });
    });
  }

}
