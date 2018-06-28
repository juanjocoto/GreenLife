import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Producto } from '../../../entities/producto';

@Component({
  selector: 'jhi-comercios-productos',
  templateUrl: './comercios-productos.component.html',
  styleUrls: ['comercios-productos.component.scss']
})
export class ComerciosProductosComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
