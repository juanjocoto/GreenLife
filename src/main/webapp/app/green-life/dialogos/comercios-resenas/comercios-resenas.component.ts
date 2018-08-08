import { Component, OnInit, Inject } from '@angular/core';
import { ResenaComercioService, ResenaComercio } from '../../../entities/resena-comercio';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { ComercioService, Comercio } from '../../../entities/comercio';
import { ResenaComponent } from '../../dialogos/resena/resena.component';
import { AccountService, User, UserService } from '../../../shared';
import { CommonAdapterService } from '../../shared/services/common-adapter.service';
import { Usuario, UsuarioService } from '../../../entities/usuario';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-comercios-resenas',
  templateUrl: './comercios-resenas.component.html',
  styleUrls: ['comercios-resenas.component.scss']
})
export class ComerciosResenasComponent implements OnInit {

  comercio: Comercio = {};
  listaResenas = [];
  usuario: Usuario = new Usuario();
  user: User = new User();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ComerciosResenasComponent>,
    private dialog: MatDialog,
    private usuarioService: UsuarioService,
    private userService: UserService,
    private route: ActivatedRoute,
    private accauntService: AccountService,
    private resenaService: ResenaComercioService,
    private comercioService: ComercioService,
    private commonAdapter: CommonAdapterService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.obtenerComercio();
    this.obtenerResenasComercio();
    this.route.params.subscribe((params) => {
      if (params && params.login) {
        this.obtenerUsuario(this.usuarioService.findByUserLogin(params.login), this.userService.find(params.login));
      } else {
        this.accauntService.get().subscribe((httpResponse) => {
          this.obtenerUsuario(this.usuarioService.findByUserLogin(httpResponse.body['login']), this.userService.find(httpResponse.body['login']));
        });
      }
    });
  }

  obtenerUsuario(observableUsuario: Observable<HttpResponse<Usuario>>, observableUser: Observable<HttpResponse<User>>): void {
    Observable.zip(observableUsuario, observableUser).subscribe((resul) => {
      this.usuario = resul[0].body;
      this.user = resul[1].body;
    });
  }

  obtenerComercio() {
    this.comercioService.find(this.data.comercioId).subscribe((resul) => {
      this.comercio = resul.body;
    });
  }

  obtenerResenasComercio() {
    this.resenaService.findByComercio(this.data.comercioId).subscribe((resul) => {
      this.listaResenas = resul.body;
      this.listaResenas.forEach((resena) => {
        resena.fechaCreacion = this.obtenerFormatoFecha(new Date(resena.fechaCreacion));
      });
    });
  }

  obtenerFormatoFecha(date) {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre'];
    return dias[date.getDay()] + ' ' + date.getDate() + ' de ' + meses[date.getMonth()] + ' del ' + date.getFullYear();
  }

  agregarResena() {
    const dialogfRef = this.dialog.open(ResenaComponent, {
      width: '500px'
    });

    dialogfRef.afterClosed().subscribe((result) => {
      const hoy = new Date();
      const resena: ResenaComercio = {
        calificacion: result[0],
        comercioId: this.comercio.id,
        comentario: result[1],
        fechaCreacion: {year: hoy.getFullYear(), month: hoy.getMonth(), day: hoy.getDate()},
        usuarioId: Number(this.usuario.id)
      };
      this.resenaService.create(resena).subscribe((resul) => {
        this.snackBar.open('Reseña agregada correctamente', undefined, { duration: 2000 });
        this.obtenerResenasComercio();
      }, (err) => {
        this.snackBar.open('Error al crear la reseña al comercio', undefined, { duration: 2000 });
      });
    });
  }

  cerrarDialogo() {
    this.dialogRef.close();
  }

}
