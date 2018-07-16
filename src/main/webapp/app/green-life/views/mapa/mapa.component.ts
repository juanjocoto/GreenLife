import { Component, OnInit } from '@angular/core';

import { GMAP_DEFAULT_SETTINGS } from '../../../app.constants';
import { Local } from '../../../entities/local/local.model';
import { LocalService } from '../../../entities/local/local.service';

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

  localList: Local[] = [];

  constructor(
    private localService: LocalService
  ) { }

  ngOnInit() {
    this.localService.getAll().subscribe((httpResponse) => {
      this.localList = httpResponse.body;
    });
  }

}
