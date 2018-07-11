import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';

@Component({
  selector: 'jhi-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  class = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (this.route.firstChild.data['value']['configuracion']) {
      this.class = 'main-container';
    } else {
      this.class = 'main-container-slim';
    }
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof RoutesRecognized) {
        const data = event.state.root.firstChild.firstChild.data;
        if (data && data.configuracion) {
          this.class = 'main-container';
        } else {
          this.class = 'main-container-slim';
        }
      }
    });
  }

}
