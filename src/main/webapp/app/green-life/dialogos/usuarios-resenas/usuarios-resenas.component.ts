import {Component, Inject, OnInit} from '@angular/core';
import {Usuario, UsuarioService} from '../../../entities/usuario';
import {Comercio, ComercioService} from '../../../entities/comercio';
import {AccountService, User, UserService} from '../../../shared';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {CommonAdapterService} from '../../shared/services/common-adapter.service';
import {ResenaCliente, ResenaClienteService} from '../../../entities/resena-cliente';
import {ResenaComponent} from '../resena/resena.component';

@Component({
  selector: 'jhi-usuarios-resenas',
  templateUrl: './usuarios-resenas.component.html',
    styleUrls: ['usuarios-resenas.component.scss']
})
export class UsuariosResenasComponent implements OnInit {

   listaResenas = [];
   usuario: Usuario = {};
   user: User = {};
   comercio: Comercio;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialogRef: MatDialogRef<UsuariosResenasComponent>,
      private dialog: MatDialog,
      private usuarioService: UsuarioService,
      private userService: UserService,
      private route: ActivatedRoute,
      private accauntService: AccountService,
      private resenaService: ResenaClienteService,
      private comercioService: ComercioService,
      private commonAdapter: CommonAdapterService,
      private snackBar: MatSnackBar) { }

  ngOnInit() {
      this.userService.findById(this.data.usuarioId).subscribe((resul) => {
          this.user = resul.body;
          this.usuarioService.findByUserLogin(this.user.login).subscribe((res) => {
             this.usuario = res.body;
             this.obtenerResenas();
          });
      });
      this.comercioService.find(this.data.comercioId).subscribe((resp) => {
         this.comercio = resp.body;
      });
  }

  obtenerResenas() {
      this.resenaService.findByUsuario(this.usuario.id).subscribe((resul) => {
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
          const resena: ResenaCliente = {
              calificacion: result[0],
              comentario: result[1],
              clienteId: this.usuario.id,
              comercioId: this.comercio.id,
              fechaCreacion: {year: hoy.getFullYear(), month: hoy.getMonth(), day: hoy.getDate()},
          };

          this.resenaService.create(resena).subscribe((resul) => {
              this.snackBar.open('Reseña agregada correctamente ', undefined, { duration: 2000 });
              this.obtenerResenas();
          }, (err) => {
              this.snackBar.open('Error al crear la reseña al usuario', undefined, { duration: 2000 });
          });
      });
  }

  cerrarDialogo() {
      this.dialogRef.close();
  }
}
