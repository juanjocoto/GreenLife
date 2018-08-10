import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { HttpResponse } from '@angular/common/http';
import { User, UserService } from '../../../shared';
import { ConfirmacionDialogComponent } from '../../dialogos/confirmacion-dialog/confirmacion-dialog.component';

@Component({
  selector: 'jhi-configuracion-usuarios',
  templateUrl: './configuracion-usuarios.component.html',
  styleUrls: ['configuracion-usuarios.component.scss']
})
export class ConfiguracionUsuariosComponent implements AfterViewInit {

  displayedColumns = ['nombre', 'estado', 'delete'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  usuario: User = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.obtenerUsuarios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Usuarios por página';
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  obtenerUsuarios() {
    this.userService.query({}).subscribe((res: HttpResponse<User[]>) => {
      this.dataSource = new MatTableDataSource<User>(res.body);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  cambiarEstado(usuario, estado) {
    const ref = this.dialog.open(ConfirmacionDialogComponent);
    let status = 'activar';
    if (!estado) { status = 'desactivar'; }
    ref.componentInstance.texto = `¿Desea ${status} el usuario ${usuario.login}?`;
    ref.afterClosed().subscribe((result) => {
      if (result) {
        usuario.activated = estado;
        this.userService.update(usuario).subscribe((res) => {
          this.obtenerUsuarios();
          this.snackBar.open('El usuario ha sido actualizado', undefined, { duration: 2000 });
        });
      }
    });
  }

  seleccionarUsuario(usuario) {
    this.usuario = usuario;
  }

  eliminar(row: User) {
    const ref = this.dialog.open(ConfirmacionDialogComponent);
    ref.componentInstance.texto = `¿Desea eliminar el usuario ${row.login}?`;
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.delete(row.login).subscribe((res) => {
          this.snackBar.open('El producto ha sido eliminado', undefined, { duration: 2000 });
          this.obtenerUsuarios();
        });
      }
    });
  }
}
