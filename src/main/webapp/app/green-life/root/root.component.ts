import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-root',
  templateUrl: './root.component.html',
  styles: [`
    .main-container{
      margin: 0px;
      min-height: calc(100vh - 57px - 345px);
    }
  `]
})
export class RootComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
