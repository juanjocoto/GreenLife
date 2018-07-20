import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

import { AccountService } from '../../../shared/auth/account.service';
import { Comercio } from '../../../entities/comercio/comercio.model';
import { ComercioService } from '../../../entities/comercio/comercio.service';
import { GMAP_DEFAULT_SETTINGS } from '../../../app.constants';
import { Local } from '../../../entities/local/local.model';
import { LocalService } from '../../../entities/local/local.service';
import { MatSlider } from '@angular/material';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from './../../../app.constants';

@Component({
  selector: 'jhi-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['mapa.component.scss']
})
export class MapaComponent implements OnInit {

  @ViewChild('slider') slider: MatSlider;

  comercioFG = new FormControl();

  // Google Maps default configuration
  zoom = GMAP_DEFAULT_SETTINGS.zoom;
  // Default Latitude and Longitude (San Jose, Costa Rica)
  defaultCoordinates: Coords = {
    lat: GMAP_DEFAULT_SETTINGS.lat,
    lng: GMAP_DEFAULT_SETTINGS.long
  };

  currentLocation: Coords = {
    lat: this.defaultCoordinates.lat,
    lng: this.defaultCoordinates.lng
  };
  cameraLocation: Coords = {
    lat: this.defaultCoordinates.lat,
    lng: this.defaultCoordinates.lng
  };
  circleLocation: Coords = {
    lat: this.currentLocation.lat,
    lng: this.currentLocation.lng
  };

  showFilter = false;

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
    this.accountService.get().subscribe(
      (httpresponse) => this.account = httpresponse.body,
      (err) => this.account = undefined
    );
    const distance = parseFloat(this.slider.value.toString()) * 1000;

    navigator.geolocation.getCurrentPosition((position) => {
      this.currentLocation.lat = position.coords.latitude;
      this.currentLocation.lng = position.coords.longitude;

      this.circleLocation.lat = position.coords.latitude;
      this.circleLocation.lng = position.coords.longitude;

      this.cameraLocation.lat = position.coords.latitude;
      this.cameraLocation.lng = position.coords.longitude;

      this.zoom = 14;

      Observable.zip(
        this.comercioService.findAll(),
        this.localService.getByDistance(this.currentLocation.lat, this.currentLocation.lng, distance))
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
    }, (err) => {
      Observable.zip(
        this.comercioService.findAll(),
        this.localService.getByDistance(this.currentLocation.lat, this.currentLocation.lng, distance))
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
    });
  }

  updateLocation(data: { coords: Coords }) {
    this.currentLocation = data.coords;
    this.circleLocation = data.coords;

    this.updateList();
  }

  updateList() {
    const distance = parseFloat(this.slider.value.toString()) * 1000;
    this.localService.getByDistance(this.currentLocation.lat, this.currentLocation.lng, distance).subscribe((response) => {
      this.localList = response.body;
    });
  }

  onMapReady(event) {
    this.showFilter = true;
  }

  private filter(value: string) {
    const filterValue = value.toLowerCase();

    return this.comercioList
      .map((comercio) => comercio.nombreComercial)
      .filter((option) => option.toLowerCase().includes(filterValue));
  }

}

interface Coords {
  lat: number; lng: number;
}
