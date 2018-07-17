import { Component, OnInit } from '@angular/core';

import { AccountService } from '../../../shared/auth/account.service';
import { Comercio } from '../../../entities/comercio/comercio.model';
import { ComercioService } from '../../../entities/comercio/comercio.service';
import { GMAP_DEFAULT_SETTINGS } from '../../../app.constants';
import { Local } from '../../../entities/local/local.model';
import { LocalService } from '../../../entities/local/local.service';
import { Observable } from '../../../../../../../node_modules/rxjs';

@Component({
  selector: 'jhi-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['mapa.component.scss']
})
export class MapaComponent implements OnInit {

  // Google Maps default configuration
  zoom = GMAP_DEFAULT_SETTINGS.zoom;
  // Default Latitude and Longitude (San Jose, Costa Rica)
  lat = GMAP_DEFAULT_SETTINGS.lat;
  long = GMAP_DEFAULT_SETTINGS.long;
  account: Account;

  localList: Local[] = [];
  comercioMap: Map<number, Comercio> = new Map();

  constructor(
    private localService: LocalService,
    private comercioService: ComercioService,
    private accountService: AccountService
  ) { }

  ngOnInit() {

    Observable.zip(
      this.comercioService.findAll(),
      this.localService.getAll())
      .subscribe((response) => {
        for (const comercio of response[0].body) {
          this.comercioMap.set(comercio.id, comercio);
        }

        this.localList = response[1].body;
        console.log(this.localList);
      });

    this.accountService.get().subscribe(
      (httpresponse) => this.account = httpresponse.body,
      (err) => this.account = undefined
    );

  }

}
