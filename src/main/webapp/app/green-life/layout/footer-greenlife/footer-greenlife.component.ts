import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'jhi-footer-greenlife',
  templateUrl: './footer-greenlife.component.html',
  styleUrls: [
      'footer-greenlife.scss'
  ]
})
export class FooterGreenlifeComponent implements OnInit {

  configuracion = true;

  constructor(private router: Router, private route: ActivatedRoute ) {
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
