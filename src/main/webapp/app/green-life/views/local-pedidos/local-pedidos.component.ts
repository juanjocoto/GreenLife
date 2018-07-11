import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../../../../node_modules/@angular/router';
import { PedidoService, Pedido } from '../../../entities/pedido';
import { Local, LocalService } from '../../../entities/local';
import { SuscripcionService } from '../../../entities/suscripcion';
import { UsuarioService, Usuario } from '../../../entities/usuario';
import { UserService, User } from '../../../shared';

@Component({
  selector: 'jhi-local-pedidos',
  templateUrl: './local-pedidos.component.html',
  styleUrls: ['local-pedidos.component.scss']
})
export class LocalPedidosComponent implements OnInit {

  local: Local = {};
  pedidos: Pedido[] = [];
  listaUsuarios: User[] = [];
  listaPedidos = [];
  dataPedidos = [];
  panelOpenState = false;

  constructor(private route: ActivatedRoute, private localService: LocalService,
    private pedidosLocales: PedidoService, private suscripcionService: SuscripcionService,
    private usuarioService: UsuarioService, private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.obtenerLocal(params['localId']);
      this.obtenerPedidosLocales(params['localId']);
    });
  }

  private obtenerLocal(id) {
    this.localService.find(id).subscribe((local) => {
      this.local = local.body as Local;
    });
  }

  private obtenerPedidosLocales(id) {
    this.pedidosLocales.findByLocal(id).subscribe((pedidos) => {
      this.pedidos = pedidos.body as Pedido[];
      this.obtenerClientes();
    });
  }

  private obtenerClientes() {
    this.pedidos.forEach((pedido) => {
      this.suscripcionService.find(pedido.suscripcionId).subscribe((suscripcion) => {
        this.usuarioService.find(suscripcion.body.usuarioId).subscribe((usuario) => {
          this.userService.findById(usuario.body.userDetailId).subscribe((user) => {
            this.listaUsuarios.push(user.body);
            this.listaUsuarios = this.removerDuplicadosArray(this.listaUsuarios, 'id');
            this.listaPedidos.push({
              'usuario': user.body,
              'suscripcion': suscripcion.body,
              'pedido': pedido
            });
          });
        });
      });
    });
  }

  private removerDuplicadosArray( lista, prop ) {
    return lista.filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  obtenerPedidosPorUsuario(usuario) {
    this.dataPedidos = [];
    this.listaPedidos.forEach((pedido) => {
      if (usuario.id === pedido.usuario.id) {
        this.dataPedidos.push(pedido);
      }
    });
    console.log(this.dataPedidos);
  }

}
