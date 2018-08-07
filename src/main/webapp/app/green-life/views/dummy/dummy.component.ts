import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../../shared';

import { HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { Suscripcion } from '../../../entities/suscripcion/suscripcion.model';
import { SuscripcionService } from '../../../entities/suscripcion/suscripcion.service';

@Component({
  selector: 'jhi-dummy',
  templateUrl: './dummy.component.html',
  styles: []
})
export class DummyComponent implements OnInit {

  suscripcion: Suscripcion;

  constructor(private dialog: MatDialog,
    private suscripcionService: SuscripcionService,
    private userService: UserService) { }

  ngOnInit() {
    this.suscripcionService.find(1).subscribe((httpResponse) => {
      this.suscripcion = httpResponse.body;
    });
  }

  doSomething() {
    const observable: Observable<HttpResponse<User>> = this.userService.registerComerciante();

    observable.subscribe((response) => { });
  }

}
