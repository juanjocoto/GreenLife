import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'jhi-footer-greenlife',
  templateUrl: './footer-greenlife.component.html',
  styleUrls: [
      'footer-greenlife.scss'
  ]
})
export class FooterGreenlifeComponent implements OnInit {

  inicio = true;

  constructor(private router: Router ) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/app' || event.url === '/') {
          this.inicio = true;
        } else {
          this.inicio = false;
        }
      }
    });
  }

  ngOnInit() {
    if (this.router.url === '/app' || this.router.url === '/') {
      this.inicio = true;
    } else {
      this.inicio = false;
    }
  }
}
