import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, RoutesRecognized } from '@angular/router';
import { AccountService } from '../../../shared';

@Component({
  selector: 'jhi-footer-greenlife',
  templateUrl: './footer-greenlife.component.html',
  styleUrls: [
      'footer-greenlife.scss'
  ]
})
export class FooterGreenlifeComponent implements OnInit {

  configuracion = true;

  constructor(private router: Router ) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof RoutesRecognized) {
        const data = event.state.root.firstChild.firstChild.data;
        this.configuracion = data.configuracion as boolean;
      }
    });
  }
}
