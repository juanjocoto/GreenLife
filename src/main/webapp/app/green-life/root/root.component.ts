import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';

@Component({
  selector: 'jhi-root',
  templateUrl: './root.component.html',
  styles: [`
    .main-container{
      margin: 57px 0px 20px;
      min-height: calc(100vh - 345px - 52px);
    }
  `]
})
export class RootComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

}
