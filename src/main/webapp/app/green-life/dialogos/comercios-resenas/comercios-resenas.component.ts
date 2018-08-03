import { Component, OnInit, Inject } from '@angular/core';
import { ResenaComercioService, ResenaComercio } from '../../../entities/resena-comercio';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { ComercioService, Comercio } from '../../../entities/comercio';
import { ResenaComponent } from '../../dialogos/resena/resena.component';
import { AccountService } from '../../../shared';
import { CommonAdapterService } from '../../shared/services/common-adapter.service';

@Component({
  selector: 'jhi-comercios-resenas',
  templateUrl: './comercios-resenas.component.html',
  styleUrls: ['comercios-resenas.component.scss']
})
export class ComerciosResenasComponent implements OnInit {

  comercio: Comercio = {};
  listaResenas = [];
  usuarioId = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ComerciosResenasComponent>,
    private dialog: MatDialog,
    private resenaService: ResenaComercioService,
    private comercioService: ComercioService,
    private auth: AccountService,
    private commonAdapter: CommonAdapterService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.obtenerComercio();
    this.obtenerResenasComercio();
    this.obtenerUsuario();
  }

  obtenerUsuario() {
    this.auth.get().subscribe((resul) => {
      this.usuarioId = resul.body.id;
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
        usuarioId: Number(this.usuarioId)
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
