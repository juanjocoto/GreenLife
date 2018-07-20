import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

import { AccountService } from '../../../shared/auth/account.service';
import { Comercio } from '../../../entities/comercio/comercio.model';
import { ComercioService } from '../../../entities/comercio/comercio.service';
import { GMAP_DEFAULT_SETTINGS } from '../../../app.constants';
import { Local } from '../../../entities/local/local.model';
import { LocalService } from '../../../entities/local/local.service';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from './../../../app.constants';

@Component({
  selector: 'jhi-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['mapa.component.scss']
})
export class MapaComponent implements OnInit {

  comercioFG = new FormControl();

  currentLocation: { lat: number, long: number };

  // Google Maps default configuration
  zoom = GMAP_DEFAULT_SETTINGS.zoom;
  // Default Latitude and Longitude (San Jose, Costa Rica)
  lat = GMAP_DEFAULT_SETTINGS.lat;
  long = GMAP_DEFAULT_SETTINGS.long;
  account: Account;

  comercioList: Comercio[] = [];
  localList: Local[] = [];
  comercioMap: Map<number, Comercio> = new Map();

  filteredOptions: Observable<string[]>;

  iconUrl = `/api/images/bitmap.png`;

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
        this.comercioList = response[0].body;
        for (const comercio of this.comercioList) {
          this.comercioMap.set(comercio.id, comercio);
        }

        this.localList = response[1].body;

        this.filteredOptions = this.comercioFG.valueChanges
          .pipe(
            startWith(''),
            map((value) => this.filter(value))
          );
      });

    this.accountService.get().subscribe(
      (httpresponse) => this.account = httpresponse.body,
      (err) => this.account = undefined
    );

    navigator.geolocation.getCurrentPosition((position) => {
      this.currentLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      };
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
      this.zoom = 14;
      this.localService.getByDistance(this.lat, this.long, 1.5 * 1000).subscribe((httpResponse) => {
        console.log(httpResponse.body);
      });
    });
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  private filter(value: string) {
    const filterValue = value.toLowerCase();

    return this.comercioList
      .map((comercio) => comercio.nombreComercial)
      .filter((option) => option.toLowerCase().includes(filterValue));
  }

}
