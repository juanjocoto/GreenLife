import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-footer-greenlife',
  templateUrl: './footer-greenlife.component.html',
  styleUrls: ['footer-greenlife.component.scss']
})
export class FooterGreenlifeComponent implements OnInit {

  configuracion = true;

  constructor(private router: Router, private route: ActivatedRoute) {
    if (!this.route.firstChild.data['value']['configuracion']) {
      this.configuracion = false;
    }
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof RoutesRecognized) {
        const data = event.state.root.firstChild.firstChild.data;
        this.configuracion = data.configuracion as boolean;
      }
    });
  }
}
