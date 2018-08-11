import { Component, OnInit } from '@angular/core';
import { Usuario, UsuarioService } from '../../../entities/usuario';
import { User, UserService, AccountService } from '../../../shared';
import { ComercioService, Comercio } from '../../../entities/comercio';
import { SuscripcionService, Suscripcion } from '../../../entities/suscripcion';
import { HttpResponse } from '../../../../../../../node_modules/@angular/common/http';
import { ActivatedRoute } from '../../../../../../../node_modules/@angular/router';
import { PedidoService, Pedido } from '../../../entities/pedido';
import { LineaProductoService, LineaProducto } from '../../../entities/linea-producto';

@Component({
  selector: 'jhi-pago-suscripcion',
  templateUrl: './pago-suscripcion.component.html',
  styleUrls: [
    'pago-suscripcion.component.scss'
  ]
})
export class PagoSuscripcionComponent implements OnInit {

  cliente: Usuario = {};
  clienteDetail: User = {};
  suscripcion: Suscripcion = {};
  comercio: Comercio = {};
  listaPedidos: Pedido[] = [];
  listaProductos = [];
  precioTotal = 0;
  descripcion = 'Pago de suscripción';

  constructor(
    private route: ActivatedRoute,
    private account: AccountService,
    private suscripcionService: SuscripcionService,
    private comercioService: ComercioService,
    private usuarioService: UsuarioService,
    private userService: UserService,
    private pedidoService: PedidoService,
    private lineaProductoService: LineaProductoService) { }

  ngOnInit() {
    this.loadCliente();
    this.route.params.subscribe((params) => {
      this.loadSuscripcion(params['suscripcionId']);
    });
  }

  private loadCliente() {
    this.account.get().subscribe((accountResponse) => {
        this.usuarioService.findByUserLogin(accountResponse.body['login']).subscribe((usuarioResponse: HttpResponse<Usuario>) => {
            this.cliente = usuarioResponse.body;
            this.userService.find(accountResponse.body['login']).subscribe((userResponse: HttpResponse<User>) => {
                this.clienteDetail = userResponse.body;
            });
        });
    });
  }

  private loadSuscripcion(id) {
    this.suscripcionService.find(id).subscribe((resul) => {
      this.suscripcion = resul.body;
      this.comercioService.find(this.suscripcion.comercioId).subscribe((res) => {
        this.comercio = res.body;
      });
      this.pedidoService.findBySuscripcionId(id).subscribe((pedidos) => {
        this.listaPedidos = pedidos.body;
        this.listaPedidos.forEach((pedido) => {
          this.lineaProductoService.findByPedidoId(pedido.id).subscribe((list) => {
            list.body.forEach((line) => {
              this.precioTotal += line.cantidad * line['producto']['precio'];
            });
            this.listaProductos.push(list.body);
          });
        });
      });
    });
  }
}
